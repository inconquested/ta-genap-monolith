<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AchievementType extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\AchievementTypeFactory> */
    use HasFactory, InteractsWithMedia;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $appends = ['icon_url'];
    protected $hidden = ['firstMedia'];
    protected $fillable = [
        'id',
        'code',
        'name',
        'description',
        'requirement_type',
        'requirement_value'
    ];


    public function firstMedia()
    {
        return $this->morphOne(Media::class, 'model'); // Adjust based on your media package
    }

    protected function iconUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getFirstMediaUrl('achievement_icon') ?: "http://localhost:8000/storage/1/polls_created_achievement.png",
        );
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('achievement_icon')->singleFile();
    }
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('achievement_icon')
            ->nonQueued()
            ->performOnCollections('achievement_icon')
            ->format('png');
    }

    public function userAchievements()
    {
        return $this->hasMany(UserAchievement::class);
    }
}
