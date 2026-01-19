<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\Poll\PollStoreRequest;
use App\Http\Requests\Poll\PollUpdateRequest;
use App\Models\Poll;
use App\Services\PollService;

class PollController extends Controller
{
    //Traits for standardized response
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(
            Poll::where('is_active', true)
                ->with(['options', 'creator:id,username'])
                ->orderBy('created_at', 'desc')->paginate(20)
        );
    }

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
    public function store(PollStoreRequest $req)
    {
        $poll = PollService::CreatePoll($req->validated());
        return $this->success(data: $poll->load('options'), status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll)
    {
        return $this->success($poll->load(['options', 'creator:id,username']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PollUpdateRequest $req, Poll $poll)
    {
        $poll = PollService::UpdatePoll(array_merge($req->validated(), ['poll_id' => $poll->id]));
        return response()->json($poll->load('options'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poll $poll)
    {
        return response()->json($poll->delete(), 204);
    }
}
