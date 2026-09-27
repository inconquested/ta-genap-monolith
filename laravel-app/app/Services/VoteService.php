<?php

namespace App\Services;

use App\Enums\VoteActions;
use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VoteService
{
    public static function CastVote(array $data)
    {
        // The voter is always the authenticated user — a client-supplied user_id is never trusted.
        $userId = Auth::id() ?? throw new \Exception('Unauthenticated', 401);

        return DB::transaction(function () use ($data, $userId) {
            $poll = Poll::findOrFail($data['poll_id']);
            if (!$poll->is_active || now()->lt($poll->start_date) || now()->gt($poll->end_date)) {
                throw new \Exception("Polling tidak aktif", 400);
            }
            // Option must belong to this poll — rejects cross-poll option spoofing.
            $option = $poll->options()->findOrFail($data['option_id']);
            if (Vote::where('poll_id', $poll->id)->where('user_id', $userId)->exists()) {
                throw new \Exception('Sudah memilih', 403);
            }
            $vote = Vote::create([
                'id' => Str::uuid(),
                'poll_id' => $poll->id,
                'option_id' => $option->id,
                'user_id' => $userId,
                'voted_at' => now(),
            ]);

            ActionLogService::record(
                VoteActions::CREATED,
                actorId: $userId,
                pollId: $vote->poll_id,
                voteId: $vote->id,
                optionId: $vote->option_id,
                new: $vote->toArray(),
            );

            // Dispatch a simple decoupled event so other domains can listen (e.g. achievements)
            if ($user = User::find($userId)) {
                \App\Events\UserActed::dispatch($user);
            }

            return $vote;
        });
    }
}
