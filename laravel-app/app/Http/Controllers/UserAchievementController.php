<?php

namespace App\Http\Controllers;

use App\Services\AchievementService;
use Illuminate\Http\Request;

class UserAchievementController extends Controller
{
    public function index(Request $request, AchievementService $service)
    {
        $user = $request->user();
        
        $userAchievements = AchievementService::getUserAchievement($user);
        $progress = $service->getProgress($user);

        return response()->json([
            'earned' => $userAchievements['earned'],
            'types' => $userAchievements['types'],
            'progress' => $progress
        ]);
    }
}
