<?php

namespace App\Http\Controllers;

use App\Services\AchievementService;
use Illuminate\Http\Request;

class UserAchievementController extends Controller
{
    public function index(Request $req, AchievementService $service)
    {
        if (!empty($req->query())) {
            return response()->json(AchievementService::getUserAchievement($req->user(), (object)$req->query()));
        }
        return response()->json(AchievementService::getUserAchievement($req->user(), null));
    }
}
