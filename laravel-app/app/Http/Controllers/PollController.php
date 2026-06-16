<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\Poll\PollStoreRequest;
use App\Http\Requests\Poll\PollUpdateRequest;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\PollResult;
use App\Models\WinnerOption;
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
        $filters = $req->only(['category']);
        $polls = PollService::getPaginatedPolls($filters);

        // API response
        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($polls);
        }

        // Web response
        return Inertia::render('polls/index', [
            'polls' => $polls,
            'categories' => PollCategory::all(),
            'topCreators' => PollService::getTopCreators(),
            'recommendedPolls' => PollService::getRecommendedPolls(3, $polls->first()?->id)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('polls/create', [
            'categories' => PollCategory::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PollStoreRequest $req)
    {
        $pollData = PollService::CreatePoll(
            $req->validated(),
            \Illuminate\Support\Facades\Auth::user()->id,
            $req->file('banner')
        );

        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success(data: $pollData, status: 201);
        }
        return redirect()->route('polls.index')->with('modalData', $pollData);
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll, Request $req)
    {
        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($poll->load(['options', 'creator:id,username', 'votes', 'comments', 'media', 'category']));
        }
        if ($poll->isClosed()) {
            return Inertia::render('polls/finalized', [
                'poll' => $poll->load(['options']),
                'results' => PollResult::where('poll_id', $poll->id)->get(),
                'winners' => WinnerOption::where('poll_result_id', $poll->result?->id)->get()
            ]);
        }
        return Inertia::render(
            'polls/show',
            [
                'poll' => $poll->load(['options', 'creator:id,username', 'votes', 'comments', 'media', 'pollCategory', 'votes'])
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        return Inertia::render('poll/create', ['poll' => $poll->load(['options', 'creator:id,username', 'votes', 'comments'])]);
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

    /**
     * Display a listing of finalized polls.
     */
    public function finalizedList(Request $req)
    {
        $polls = Poll::with(['options', 'creator:id,username', 'category', 'media', 'result', 'votes'])
            ->where('is_active', false)
            ->orWhere('end_date', '<', now())
            ->orderBy('end_date', 'desc')
            ->paginate(10);

        if ($req->is('api/*') || $req->expectsJson()) {
            return response()->json($polls);
        }

        return Inertia::render('polls/finalized', [
            'polls' => $polls
        ]);
    }

    /**
     * Display a listing of the user's polls.
     */
    public function userPolls(Request $req, \App\Models\User $user)
    {
        $polls = Poll::where('creator_id', $user->id)
            ->with(['media', 'pollCategory', 'options'])
            ->withCount(['votes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($polls);
        }

        return Inertia::render('polls/user-polls', [
            'polls' => $polls
        ]);
    }
}
