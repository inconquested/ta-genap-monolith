<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollResult extends Model
{
    protected $fillable = [
        'poll_id',
        'is_draw',
        'finalized_option'
    ];
    public function winningOption()
    {
        return $this->belongsTo(PollOption::class, 'finalized_option');
    }
}
