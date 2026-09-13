<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Models\UserAchievement;
use App\Services\AchievementService;
use Illuminate\Http\Request;

class UserAchievementController extends Controller
{
    use ApiResponse;

    public function index(Request $req, AchievementService $service)
    {
        if (!empty($req->query())) {
            return response()->json(AchievementService::getUserAchievement($req->user(), (object)$req->query()));
        }
        return response()->json(AchievementService::getUserAchievement($req->user(), null));
    }

    public function revoke(Request $req, UserAchievement $userAchievement, AchievementService $service)
    {
        $data = $req->validate([
            'reason' => ['nullable', 'string', 'max:255'],
        ]);
        $service->revoke($userAchievement, $data['reason'] ?? null);

        return $this->success($userAchievement->fresh(), 'Achievement revoked');
    }

    public function restore(UserAchievement $userAchievement, AchievementService $service)
    {
        $service->restore($userAchievement);

        return $this->success($userAchievement->fresh(), 'Achievement restored');
    }
}
