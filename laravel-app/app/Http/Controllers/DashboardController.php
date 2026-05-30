<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Enums\UserRole;
use App\Models\Poll;
use App\Services\AchievementService;
use App\Services\DashboardService;
use App\Services\PollService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use ApiResponse;
    public function index(Request $req)
    {
        if ($req->is("api/*")) {
            return $this->success(data: DashboardService::getAdminMetrics($req), status: 200);
        } else {
            $userAchievements = AchievementService::getUserAchievement(auth()->user());
            return Inertia::render('dashboard', [
                'userPolls' => Poll::where('creator_id', auth()->id())->with(['media'])->get(),
                'trendingPoll' => PollService::getTrendingPoll(),
                'achievements' => [
                    'earned' => $userAchievements['earned'],
                    'types' => $userAchievements['types'],
                    'progress' => $userAchievements['progress'],
                ],
            ]);
        }
    }
}