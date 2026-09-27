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
        // search/status/sort/per_page feed the desktop dashboard poll picker; web passes category only.
        $filters = $req->only(['category', 'search', 'status', 'sort', 'per_page']);
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
        return redirect()->route('polls.index')->with('success', 'Polling berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll, Request $req)
    {
        if ($req->is('api/*') || $req->expectsJson()) {
            return $this->success($poll->load(['options', 'creator:id,username', 'votes', 'comments', 'media', 'pollCategory']));
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
                'poll' => $poll->load(['options', 'creator:id,username', 'votes', 'comments.user:id,username', 'media', 'pollCategory'])
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        return Inertia::render('polls/edit', [
            'poll' => $poll->load(['options', 'creator:id,username', 'votes', 'comments']),
            'categories' => PollCategory::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PollUpdateRequest $req, Poll $poll)
    {
        $validated = $req->validated();
        $updated = PollService::UpdatePoll(array_merge($validated, [
            'poll_id' => $poll->id,
            // Authoritative values from the route model, never the client
            'creator_id' => $poll->creator_id,
            'is_finalized' => $validated['is_finalized'] ?? $poll->is_finalized,
            'category' => $validated['category'] ?? $poll->category,
            'quorum_count' => $validated['quorum_count'] ?? $poll->quorum_count,
        ]));

        if ($req->is('api/*') || $req->expectsJson()) {
            return response()->json($updated->load('options'));
        }

        return redirect()->route('polls.show', $poll->id)->with('success', 'Perubahan polling berhasil disimpan!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poll $poll, Request $req)
    {
        $poll->delete();

        if ($req->is('api/*') || $req->expectsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->route('polls.index')->with('success', 'Polling berhasil dihapus!');
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
