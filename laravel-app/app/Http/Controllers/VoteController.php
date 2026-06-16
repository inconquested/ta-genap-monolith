<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\Vote\VoteStoreRequest;
use App\Models\Poll;
use App\Models\PollOption;
use App\Models\Vote;
use App\Services\VoteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoteController extends Controller
{
    //Traits for stardardized response
    use ApiResponse;

    public function index(Poll $poll)
    {
        return $this->success($poll->votes()->with(['pollOption'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VoteStoreRequest $req)
    {
        try {
            $vote = VoteService::CastVote($req->validated());

            if ($req->is('api/*') || $req->expectsJson()) {
                return $this->success(data: $vote, status: 201);
            }

            return redirect()->back();
        } catch (\Exception $e) {
            if ($req->is('api/*') || $req->expectsJson()) {
                return $this->error($e->getMessage(), 'Validation Error', $e->getCode() ?: 400);
            }

            return redirect()->back()->withErrors(['vote' => $e->getMessage()]);
        }
    }

    public function showUserVotes(Request $req)
    {
        $votes = Vote::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->with(['poll.media', 'poll.pollCategory', 'pollOption'])
            ->paginate(10);

        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($votes);
        }

        return Inertia::render('polls/history', [
            'votes' => $votes
        ]);
    }

    public function getPollResults($pollId)
    {
        $results = PollOption::where('poll_id', $pollId)
            ->withCount('votes')
            ->get()
            ->map(function ($option) {
                return [
                    'id' => $option->id,
                    'text' => $option->value,
                    'votes' => $option->votes_count,
                ];
            });
        return $this->success(['results' => $results, 'resultCount' => $results->sum('votes')]);
    }
}
