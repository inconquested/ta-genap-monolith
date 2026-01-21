<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollOption extends Model
{
    /** @use HasFactory<\Database\Factories\PollOptionFactory> */
    use HasFactory, HasUuids;
    protected $table = 'poll_options';

    protected $fillable = [
        'id',
        'poll_id',
        'display_order',
        'option_text'
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class, 'poll_id');
    }
    public function votes()
    {
        return $this->hasMany(Vote::class, 'option_id');
    }
}
