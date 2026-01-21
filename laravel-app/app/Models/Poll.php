<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Poll extends Model
{
    /** @use HasFactory<\Database\Factories\PollFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'title',
        'creator_id',
        'description',
        'start_date',
        'end_date',
        'is_active',
        'allow_comments',
    ];
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
    public function result(): HasOne
    {
        return $this->hasOne(PollResult::class);
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
