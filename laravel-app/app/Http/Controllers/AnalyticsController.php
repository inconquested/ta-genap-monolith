<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Models\Poll;
use App\Services\PollAnalyticsService;
use App\Services\PollOptionSeriesService;
use Illuminate\Http\Request;
class AnalyticsController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/analytics/polls/{poll} — provider-facing per-poll KPIs (admin only).
     */
    public function show(Request $request, Poll $poll)
    {
        return $this->success(PollAnalyticsService::generate($request, $poll));
    }

    /**
     * GET /api/analytics/polls/{poll}/options — per-option standings + series (admin only).
     * Powers the desktop pie / stacked-timeseries panels. Optional from/to/bucket.
     */
    public function options(Request $request, Poll $poll)
    {
        return $this->success(PollOptionSeriesService::generate($request, $poll));
    }

    /**
     * GET /api/analytics/polls/{poll}/comments — commenting behaviour report (admin only).
     */
    public function comments(Request $request, Poll $poll)
    {
        return $this->success(PollAnalyticsService::commentAnalytics($request, $poll));
    }
}
