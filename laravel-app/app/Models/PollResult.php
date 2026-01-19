<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollResult extends Model
{
    protected $fillable = [
        'id',
        'poll_id',
        'is_draw',
        'total_votes'
    ];
    public function winningOption()
    {
        return $this->belongsTo(PollOption::class, 'finalized_option');
    }
}
