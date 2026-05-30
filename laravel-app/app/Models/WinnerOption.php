<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WinnerOption extends Model
{
    protected $fillable =[
     'id',
     'poll_result_id',
     'option_id'
    ];

    public function pollResult()
    {
        return $this->belongsTo(PollResult::class);
    }

    public function option()
    {
        return $this->belongsTo(PollOption::class, 'option_id');
    }
}
