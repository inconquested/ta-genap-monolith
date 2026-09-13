<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

/**
 * Standard (database) notification for an unlocked achievement — the durable counterpart to the
 * real-time AchievementUnlocked broadcast. Shows up in the notifications bell alongside PollNotification.
 * Holds scalars only (no model refs) so it survives the AchievementType being deleted later.
 */
class AchievementNotification extends Notification
{
    public function __construct(
        public string $achievementId,
        public string $label,
    ) {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'achievement_unlocked',
            'message' => "Selamat! Anda membuka pencapaian: \"{$this->label}\"",
            'achievement_id' => $this->achievementId,
            'action_url' => '/dashboard',
            'icon' => 'Trophy',
        ];
    }
}
