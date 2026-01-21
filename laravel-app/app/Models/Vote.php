<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
    /** @use HasFactory<\Database\Factories\VoteFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'poll_id',
        'option_id',
        'user_id',
        'voted_at',
    ];

    public function pollOption(): BelongsTo
    {
        return $this->belongsTo(PollOption::class, 'option_id');
    }
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class, 'poll_id');
    }
}
