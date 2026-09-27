<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Enums\UserRole;
use App\Http\Requests\Comment\CommentStoreRequest;
use App\Http\Requests\Comment\CommentUpdateRequest;
use App\Models\Comment;
use App\Models\Poll;
use App\Notifications\PollNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Poll-scoped comment CRUD. Route params ({poll}, {comment}) are resolved by id here rather than via
 * implicit model binding, which does not resolve reliably on these nested API routes.
 * Both segments must stay in the signature: leftover params arrive positionally, so a lone
 * `string $comment` would receive the {poll} id.
 */
class CommentController extends Controller
{
    use ApiResponse;

    /**
     * List a poll's comments (newest first, with commenter).
     */
    public function index(Request $req)
    {
        $poll = $this->resolvePoll($req);
        $comments = $poll->comments()->with('user:id,username')->latest()->paginate(20);

        if ($this->wantsJson($req)) {
            return $this->success($comments);
        }

        return Inertia::render('Comments/Index', ['comments' => $comments]);
    }

    /**
     * Store a comment on a poll. Poll comes from the {poll} route param (API) or a poll_id body field (web).
     */
    public function store(CommentStoreRequest $req)
    {
        $poll = $this->resolvePoll($req)->loadMissing('creator');

        if (! $poll->allow_comments) {
            return $this->reject($req, 'Comments are disabled for this poll.');
        }

        $comment = \Illuminate\Support\Facades\DB::transaction(function () use ($poll, $req) {
            $comment = $poll->comments()->create([
                'content' => $req->validated('content'),
                'user_id' => $req->user()->id,
            ]);
            \App\Services\ActionLogService::record(
                \App\Enums\VoteActions::CREATED,
                actorId: $req->user()->id,
                pollId: $poll->id,
                new: ['comment_id' => $comment->id, 'content' => $comment->content],
            );

            return $comment;
        });

        // Notify poll creator when someone else comments.
        if ($poll->creator_id !== $req->user()->id && $poll->creator) {
            $poll->creator->notify(new PollNotification('new_comment', [
                'message' => "{$req->user()->username} mengomentari polling Anda: \"{$poll->title}\"",
                'poll_id' => $poll->id,
                'action_url' => route('polls.show', $poll->id),
                'icon' => 'MessageSquare',
            ]));
        }

        if ($this->wantsJson($req)) {
            return $this->success($comment->load('user:id,username'), 'Comment posted', 201);
        }

        return redirect()->back();
    }

    /**
     * Display a single comment.
     */
    public function show(Request $req, string $poll, string $comment)
    {
        $comment = Comment::with('user:id,username')->findOrFail($comment);

        if ($this->wantsJson($req)) {
            return $this->success($comment);
        }

        return Inertia::render('Comments/Show', ['comment' => $comment]);
    }

    /**
     * Update a comment — author or admin only.
     */
    public function update(CommentUpdateRequest $req, string $poll, string $comment)
    {
        $comment = Comment::findOrFail($comment);

        if (! $this->owns($req, $comment)) {
            return $this->reject($req, 'You cannot edit this comment.');
        }

        $old = $comment->only(['id', 'content', 'user_id']);
        \Illuminate\Support\Facades\DB::transaction(function () use ($req, $comment, $old) {
            $comment->update($req->validated());
            \App\Services\ActionLogService::record(
                \App\Enums\VoteActions::UPDATED,
                actorId: $req->user()->id,
                pollId: $comment->poll_id,
                old: $old,
                new: ['comment_id' => $comment->id, 'content' => $comment->fresh()->content],
            );
        });

        if ($this->wantsJson($req)) {
            return $this->success($comment->fresh()->load('user:id,username'));
        }

        return redirect()->back();
    }

    /**
     * Delete a comment — author or admin only.
     */
    public function destroy(Request $req, string $poll, string $comment)
    {
        $comment = Comment::findOrFail($comment);

        if (! $this->owns($req, $comment)) {
            return $this->reject($req, 'You cannot delete this comment.');
        }

        $snapshot = $comment->only(['id', 'content', 'user_id']);
        $pollId = $comment->poll_id;
        \Illuminate\Support\Facades\DB::transaction(function () use ($req, $comment, $snapshot, $pollId) {
            $comment->delete();
            \App\Services\ActionLogService::record(
                \App\Enums\VoteActions::DELETED,
                actorId: $req->user()->id,
                pollId: $pollId,
                new: ['comment_id' => $snapshot['id'], 'content' => $snapshot['content']],
            );
        });

        if ($this->wantsJson($req)) {
            return $this->success([], 'Comment deleted');
        }

        return redirect()->back();
    }

    private function owns(Request $req, Comment $comment): bool
    {
        return $comment->user_id === $req->user()->id || $req->user()->role === UserRole::ADMIN;
    }

    private function resolvePoll(Request $req): Poll
    {
        // {poll} arrives as a raw id string (no implicit binding); web POST /comments sends poll_id in the body.
        $routePoll = $req->route('poll');

        if ($routePoll instanceof Poll) {
            return $routePoll;
        }

        return Poll::findOrFail($routePoll ?? $req->input('poll_id'));
    }

    private function wantsJson(Request $req): bool
    {
        return $req->is('api/*') || $req->expectsJson();
    }

    private function reject(Request $req, string $message)
    {
        return $this->wantsJson($req)
            ? $this->error($message, 'Forbidden', 403)
            : redirect()->back()->withErrors(['message' => $message]);
    }
}
