<?php

namespace App\Services;
use App\Models\Poll;
use App\Models\PollResult;
use App\Models\WinnerOption;
use Illuminate\Foundation\Auth\User;

class PollReportService
{
    public static function generatePollReport($req, Poll $poll)
    {
        $votes = PollResult::where('poll_id', $poll->id)->sum('total_votes');
        $metrics = [];
        if (WinnerOption::where('poll_id', $poll->id)->count() > 0) {
            $winner = WinnerOption::where('poll_id', $poll->id)->first();
            $metrics[] = [
                'key' => 'winner',
                'label' => 'Pemenang',
                'type' => 'text'
            ];
        }

        if ($req->has('participation_rate')) {
            $metrics[] = [
                'key' => 'participation_rate',
                'label' => 'Partisipasi',
                'value' => number_format($votes, 2, '.', ''),
                'type' => 'number'
            ];
            if ($req->has('engagement_rate')) {
                $users = User::count();
                $metrics[] = [
                    'key' => 'engagement_rate',
                    'label' => 'Engagement',
                    'displayValue' => round(($votes / $users) * 100) . '%',
                    'type' => 'percent',
                    'highlight' => true
                ];
            }

            return [
                'title' => $poll->title,
                'generated_at' => now()->toIso8601String(),
                'metrics' => $metrics
            ];
        }
    }
}