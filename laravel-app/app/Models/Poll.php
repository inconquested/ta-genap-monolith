<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'allow_multiple_votes',
    ];
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function options(): HasMany
    {
        return $this->hasMany(PollOption::class);
    }
}
