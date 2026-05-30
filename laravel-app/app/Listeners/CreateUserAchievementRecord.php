<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Models\UserAchievement;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateUserAchievementRecord implements ShouldQueue
{
    public function handle(AchievementUnlocked $event): void
    {
        Log::info("Listener CreateUserAchievementRecord handling event for achievement: " . $event->achievementType->name);
        UserAchievement::create([
            'user_id' => $event->user->id,
            'achievement_type_id' => $event->achievementType->id,
            'progress_data' => ['completed_at' => now(), 'current_value' => $event->achievementType->requirement_value],
            'earned_at' => now(),
        ]);
    }
}
