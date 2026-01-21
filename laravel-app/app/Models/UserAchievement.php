<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAchievement extends Model
{
    /** @use HasFactory<\Database\Factories\UserAchievementFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'achievement_type_id',
        'earned_at',
        'progress_data'
    ];
    protected $casts = [
        'progress_data' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function achievementType(): BelongsTo
    {
        return $this->belongsTo(AchievementType::class);
    }
}
