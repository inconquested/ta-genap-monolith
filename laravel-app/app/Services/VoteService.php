<?php

namespace App\Services;

use App\Enums\VoteActions;
use App\Models\Poll;
use App\Models\Vote;
use App\Models\VoteAuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class VoteService
{
    public static function CastVote(array $data)
    {
        $poll = Poll::findOrFail($data['poll_id']);
        if (!$poll->is_active || now()->lt($poll->start_date) || now()->gt($poll->end_date)) {
            throw new \Exception("Polling tidak aktif", 400);
        }
        $existingVote = Vote::where('poll_id', $data['poll_id'])
            ->where('user_id', Auth::id())
            ->first();
        if ($existingVote) {
            throw new \Exception('Sudah memilih', 403);
        }
        $vote = Vote::create([
            'id' => Str::uuid(),
            'poll_id' => $data['poll_id'],
            'option_id' => $data['option_id'],
            'user_id' => $data['user_id'] ?? Auth::id(),
            'voted_at' => now(),
        ]);

        VoteAuditLog::create([
            'id' => Str::uuid(),
            'action' => VoteActions::CREATED,
            'vote_id' => $vote->id,
            'performed_by_user_id' => $vote->user_id,
            'performed_by_user_ip' => request()->ip(),
            'platform' => request()->header('sec-ch-ua-platform', 'Web'),
            'user_agent' => request()->userAgent(),
            'old_values' => null,
            'new_values' => $vote->toArray(),
            'poll_id' => $vote->poll_id,
            'option_id' => $vote->option_id,
        ]);

        // Dispatch a simple decoupled event so other domains can listen (e.g. achievements)
        if ($user = \App\Models\User::find($vote->user_id)) {
            \App\Events\UserActed::dispatch($user);
        }

        return $vote;
    }
}
