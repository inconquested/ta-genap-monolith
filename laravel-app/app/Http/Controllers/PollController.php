<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\Poll\PollStoreRequest;
use App\Http\Requests\Poll\PollUpdateRequest;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Services\PollService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PollController extends Controller
{
    //Traits for standardized response
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $polls = Poll::where('is_active', true)
                ->with(['options', 'creator:id,username', 'votes', 'comments'])
                ->orderBy('created_at', 'desc')->paginate(20);
        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($polls);
        }
        return $this->success(
            $polls
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('polls/create',[
            'categories'=>PollCategory::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PollStoreRequest $req)
    {
        $pollData = PollService::CreatePoll($req->validated(), \Illuminate\Support\Facades\Auth::user()->id);
    
        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success(data: $pollData, status: 201);
        }
        return $this->success(data: $pollData->load(['options', 'votes', 'comments']), status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll)
    {
        return $this->success($poll->load(['options', 'creator:id,username', 'votes', 'comments']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        return Inertia::render('poll/create',['poll'=>$poll->load(['options','creator:id,username','votes','comments'])]);
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
