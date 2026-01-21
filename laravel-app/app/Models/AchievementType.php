<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchievementType extends Model
{
    /** @use HasFactory<\Database\Factories\AchievementTypeFactory> */
    use HasFactory;
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
