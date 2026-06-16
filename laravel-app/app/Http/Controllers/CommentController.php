<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\Comment\CommentStoreRequest;
use Inertia\Inertia;
use App\Http\Requests\Comment\CommentUpdateRequest;

class CommentController extends Controller
{
    public function userIndex(Request $req)
    {
        $comments = Comment::where('user_id', $req->user_id)->get();
        return Inertia::render('Comments/Index', [
            'comments' => $comments,
        ]);
    }
    public function pollIndex(Request $req)
    {
        $comments = Comment::where('poll_id', $req->poll_id)->get();
        return Inertia::render('Comments/Index', [
            'comments' => $comments,
        ]);
    }

    /**
     * 
     * Store a newly created resource in storage.
     */
    public function store(CommentStoreRequest $req)
    {
        try {
            $poll = \App\Models\Poll::with('creator')->findOrFail($req->poll_id);
            $comment = $poll->comments()->create($req->validated());
            
            // Notify poll creator if someone else comments
            if ($poll->creator_id !== $req->user()->id) {
                $poll->creator->notify(new \App\Notifications\PollNotification('new_comment', [
                    'message' => "{$req->user()->username} mengomentari polling Anda: \"{$poll->title}\"",
                    'poll_id' => $poll->id,
                    'action_url' => route('polls.show', $poll->id),
                    'icon' => 'MessageSquare'
                ]));
            }

            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['message' => 'Failed to post comment.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentUpdateRequest $request, Comment $comment)
    {
        $comment->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
