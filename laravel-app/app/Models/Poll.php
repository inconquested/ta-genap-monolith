<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Poll extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\PollFactory> */
    use HasFactory, HasUuids, InteractsWithMedia;
    protected $fillable = [
        'id',
        'title',
        'creator_id',
        'description',
        'start_date',
        'end_date',
        'is_finalized',
        'allow_quorum',
        'quorum_count',
        'category',
        'is_active',
        'allow_comments',
    ];

    //Eloquent relations
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function options(): HasMany
    {
        return $this->hasMany(PollOption::class, 'poll_id');
    }
    public function votes(): HasManyThrough
    {
        return $this->hasManyThrough(Vote::class, PollOption::class, 'poll_id', 'option_id', 'id', 'id');
    }
    public function category (): BelongsTo{
        return $this->belongsTo(PollCategory::class, 'category');
    }
    public function result(): HasOne
    {
        return $this->hasOne(PollResult::class);
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    //Media register
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('banner')
        ->singleFile()
        ->withResponsiveImages();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('banner')
        ->width(1500)
        ->height(500)
        ->sharpen(15)
        ->performOnCollection('banner');
    }
}
