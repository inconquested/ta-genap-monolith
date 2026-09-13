<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Models\UserAchievement;
use App\Notifications\AchievementNotification;
use Illuminate\Support\Facades\Log;

// ponytail: sync on purpose — one insert + one notification per award, not worth a queue
// worker; also means the pipeline works with no worker running (e.g. localhost).
// Re-add ShouldQueue (and snapshot scalars in the event) if award volume ever hurts.
class CreateUserAchievementRecord
{
    public function handle(AchievementUnlocked $event): void
    {
        Log::info("Listener CreateUserAchievementRecord handling event for achievement: " . $event->achievementType->name);
        try {
            UserAchievement::create([
                'user_id' => $event->user->id,
                'achievement_type_id' => $event->achievementType->id,
                'progress_data' => ['completed_at' => now(), 'current_value' => $event->achievementType->requirement_value],
                'earned_at' => now(),
            ]);
        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            Log::info("Handled race condition for achievement: " . $event->achievementType->name);
            return;
        }

        // Durable notification alongside the real-time broadcast (shows in the notifications bell).
        $event->user->notify(
            new AchievementNotification($event->achievementType->id, $event->achievementType->label)
        );
    }
}
