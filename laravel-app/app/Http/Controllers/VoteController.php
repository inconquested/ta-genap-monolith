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
            return $this->success(data: $vote, status: 201);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 'Validation Error', $e->getCode() ?: 400);
        }
    }

    public function showUserVotes()
    {
        return $this->success(Vote::where('user_id', Auth::id())->orderBy('created_at', 'desc')->with(['poll', 'pollOption'])->get());
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
