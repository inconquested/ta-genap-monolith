<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class AchievementType extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\AchievementTypeFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'id',
        'code',
        'name',
        'description',
        'requirement_type',
        'requirement_value'
    ];

    public function userAchievements()
    {
        return $this->hasMany(UserAchievement::class);
    }
}
