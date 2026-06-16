<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\AchievementType;

class AchievementUnlocked implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public User $user;
    public AchievementType $achievementType;

    public function __construct(User $user, AchievementType $achievementType)
    {
        $this->user = $user;
        $this->achievementType = $achievementType;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('user.' . $this->user->id);
    }

    /**
     * The data to broadcast to the client.
     * Return a plain array to avoid model hydration issues on the client.
     */
    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->user->id,
            'achievement' => [
                'id' => $this->achievementType->id,
                'code' => $this->achievementType->code,
                'name' => $this->achievementType->name,
                'description' => $this->achievementType->description,
                'icon_url' => $this->achievementType->icon_url,
                'requirement_value' => $this->achievementType->requirement_value,
            ],
        ];
    }

    /**
     * Friendly event name for the client
     */
    public function broadcastAs(): string
    {
        return 'achievement.unlocked';
    }
}
