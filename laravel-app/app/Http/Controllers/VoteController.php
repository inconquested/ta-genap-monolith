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

    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VoteStoreRequest $req)
    {
        return $this->success(data: VoteService::CastVote($req->validated()), status: 201);
    }

    public function showUserVotes()
    {

        return $this->success(Poll::where('user_id', Auth::id())->orderBy('created_at', 'desc')->with('votes'));
    }
    public function getPollResults($pollId)
    {
        $results = PollOption::where('poll_id', $pollId)
            ->withCounts('votes')
            ->get()
            ->map(function ($option) {
                return [
                    'id' => $option->id,
                    'text' => $option->text,
                    'votes' => $option->votes_count,
                ];
            });
        return $this->success(['results' => $results, 'resultCount' => $results->sum('votes')]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vote $vote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vote $vote)
    {
        //
    }
}
