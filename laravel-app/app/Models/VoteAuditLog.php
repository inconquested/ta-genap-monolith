<?php

namespace App\Models;

use App\Enums\VoteActions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VoteAuditLog extends Model
{
    const UPDATED_AT = null;
    protected $fillable = [
        'id',
        'action',
        'vote_id',
        'performed_by_user_id',
        'performed_by_user_ip',
        'platform',
        'user_agent',
        'old_values',
        'new_values',
        'poll_id',
        'option_id',
    ];
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'action' => VoteActions::class,
        'created_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        // Prevent updates (make logs immutable at application level too)
        static::updating(function ($model) {    
            throw new \Exception('Audit logs cannot be updated');
        });

        // Prevent deletes (make logs immutable at application level too)
        static::deleting(function ($model) {
            throw new \Exception('Audit logs cannot be deleted');
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the vote that was acted upon
     */
    public function vote(): BelongsTo
    {
        return $this->belongsTo(Vote::class);
    }

    /**
     * Get the poll related to this log
     */
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    /**
     * Get the poll option related to this log
     */
    public function option(): BelongsTo
    {
        return $this->belongsTo(PollOption::class, 'option_id');
    }
}
