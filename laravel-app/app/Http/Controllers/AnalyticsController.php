<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Models\Poll;
use App\Services\PollAnalyticsService;
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
     * GET /api/analytics/polls/{poll}/comments — commenting behaviour report (admin only).
     */
    public function comments(Request $request, Poll $poll)
    {
        return $this->success(PollAnalyticsService::commentAnalytics($request, $poll));
    }
}
