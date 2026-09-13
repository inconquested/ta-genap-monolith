<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
use App\Models\WinnerOption;
use Illuminate\Http\Request;

class PollReportService
{
    /**
     * End-user poll report. Normalized metrics[] (value always present) so the client can render
     * charts/tiles without per-key special-casing. Comment engagement is surfaced here per the
     * "user-facing comment report" requirement.
     */
    public static function generatePollReport(Request $req, Poll $poll)
    {
        $poll->loadCount(['votes', 'comments']);           // one round trip, no N+1
        $pollResult   = $poll->result;                     // hasOne — precomputed at finalize
        $totalVotes   = $pollResult ? (int) $pollResult->total_votes : (int) $poll->votes_count;
        $uniqueVoters = Vote::where('poll_id', $poll->id)->distinct()->count('user_id');
        $commenters   = $poll->comments()->distinct()->count('user_id');

        $metrics = [];

        if ($pollResult && ($winner = WinnerOption::with('option')->where('poll_result_id', $pollResult->id)->first())) {
            $metrics[] = [
                'key' => 'winner',
                'label' => 'Pemenang',
                'value' => $pollResult->is_draw ? 'Seri' : ($winner->option->value ?? 'N/A'),
                'type' => 'text',
                'highlight' => true,
            ];
        }

        // Always-on rich base — consistent shape for the client.
        $metrics[] = ['key' => 'total_votes', 'label' => 'Total Suara', 'value' => $totalVotes, 'type' => 'number'];
        $metrics[] = ['key' => 'unique_voters', 'label' => 'Pemilih Unik', 'value' => $uniqueVoters, 'type' => 'number'];
        $metrics[] = ['key' => 'total_comments', 'label' => 'Total Komentar', 'value' => (int) $poll->comments_count, 'type' => 'number'];
        $metrics[] = ['key' => 'unique_commenters', 'label' => 'Komentator Unik', 'value' => $commenters, 'type' => 'number'];

        $engagement = $uniqueVoters > 0 ? round($poll->comments_count / $uniqueVoters, 2) : 0;
        $metrics[] = ['key' => 'comment_engagement', 'label' => 'Keterlibatan Komentar', 'value' => $engagement, 'type' => 'number'];

        // Opt-in flags (kept for backward compat). participation_rate is now the *real* rate
        // (distinct voters / eligible users), not the raw vote count it used to mislabel.
        if ($req->has('participation_rate')) {
            $eligible = max(1, User::count());
            $rate = round($uniqueVoters / $eligible * 100, 2);
            $metrics[] = ['key' => 'participation_rate', 'label' => 'Partisipasi', 'value' => $rate, 'displayValue' => round($rate) . '%', 'type' => 'percent', 'unit' => '%'];
        }

        if ($req->has('engagement_rate')) {
            $eligible = max(1, User::count());
            $rate = round($totalVotes / $eligible * 100, 2);
            $metrics[] = ['key' => 'engagement_rate', 'label' => 'Engagement', 'value' => $rate, 'displayValue' => round($rate) . '%', 'type' => 'percent', 'unit' => '%', 'highlight' => true];
        }

        return [
            'title' => $poll->title,
            'generated_at' => now()->toIso8601String(),
            'metrics' => $metrics,
        ];
    }
}
