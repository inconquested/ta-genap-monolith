<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class VoteService
{
    public static function CastVote(array $data)
    {
        $poll = Poll::findOrFail($data['poll_id']);
        if (!$poll->is_active || now()->lt($poll->start_date) || now()->gt($poll->end_date)) {
            return new \Exception("Polling tidak aktif", 400);
        }
        $existingVote = Vote::where('poll_id', $data['poll_id'])
            ->where('user_id', Auth::id())
            ->first();
        if ($existingVote && !$poll->allow_multiple_votes) {
            return new \Exception('Sudah memilih', 403);
        }
        $vote = Vote::create([
            'id' => Str::uuid(),
            'poll_id' => $data['poll_id'],
            'option_id' => $data['option_id'],
            'user_id' => $data['user_id'] ?? Auth::id(),
            'voted_at' => now(),
        ]);
        return $vote;
    }
}
