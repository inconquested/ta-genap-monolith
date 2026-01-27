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
}
