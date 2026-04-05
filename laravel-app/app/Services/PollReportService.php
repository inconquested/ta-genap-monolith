<?php

namespace App\Services;
use App\Models\Poll;
use App\Models\PollResult;
use Illuminate\Foundation\Auth\User;

class PollReportService
{
    public static function generatePollReport($req, Poll $poll)
    {
        $query = $req->query;
        $votes = PollResult::where('poll_id', $poll->id)->sum('total_votes');

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
                'generated_at' => now(),
                'metrics' => $metrics
            ];
        }
    }
}