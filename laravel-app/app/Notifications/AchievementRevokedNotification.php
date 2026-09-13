<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

/**
 * Database notification when a user's achievement is revoked by an admin,
 * or removed because its AchievementType was deleted/replaced.
 * Holds scalars only (no model refs) — the AchievementType row may be gone
 * by the time this is rendered.
 */
class AchievementRevokedNotification extends Notification
{
    public function __construct(
        public string $achievementId,
        public string $label,
        public string $message,
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
            'type' => 'achievement_revoked',
            'message' => $this->message,
            'achievement_id' => $this->achievementId,
            'action_url' => '/dashboard',
            'icon' => 'CircleSlash',
        ];
    }
}
