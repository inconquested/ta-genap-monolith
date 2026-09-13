<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Services\AchievementService;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use ApiResponse;

    /**
     * Display the user's dashboard with their polls, trending poll, and achievements.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $userPolls = DashboardService::getUserPolls($user);
        $usersActive = DashboardService::getUsersActiveCount();
        $trendingPoll = DashboardService::getTrendingPoll();
        $achievements = AchievementService::getUserAchievement($user);
        
        logger('DashboardController@index', [
            'user' => $user,
            'userPolls' => $userPolls,
            'usersActive' => $usersActive,
            'trendingPoll' => $trendingPoll,
            'achievements' => $achievements,
        ]);

        return Inertia::render('dashboard', [
            'userPolls' => $userPolls,
            'usersActive' => $usersActive,
            'trendingPoll' => $trendingPoll,
            'achievements' => $achievements,
        ]);
    }

    /**
     * Return dashboard metrics as JSON for the API consumer.
     *
     * Response shape:
     * {
     *   "users_active": int,
     *   "polls_created": int,
     *   "votes_casted": int,
     *   "table_data": [{ "id": string, "title": string, "created_at": string }],
     *   "chart_data": [{ "key": string, "value": string }]
     * }
     */
    public function metrics(Request $request): JsonResponse
    {
        $metrics = DashboardService::getAdminMetrics($request);

        return response()->json($metrics);
    }

    /**
     * GET /api/dashboard/health — platform healthcheck report (admin only).
     */
    public function health(Request $request)
    {
        return $this->success(DashboardService::getPlatformHealth());
    }
}
