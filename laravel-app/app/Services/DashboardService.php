<?php

namespace App\Services;
use App\Models\Poll;
use App\Models\Vote;
use Carbon\Carbon;

class DashboardService
{
    public static function getAdminMetrics(?object $query = null)
    {
        $activeUsers = \Illuminate\Support\Facades\DB::table('sessions')
            ->whereNotNull('user_id')
            ->where('last_activity', '>=', Carbon::now()->subMinutes(15))
            ->count() - 1;

        $rawTimeFrame = $query?->time_frame ?? 7;
        if (is_string($rawTimeFrame) && str_ends_with(strtolower($rawTimeFrame), 'h')) {
            $dateLimit = Carbon::now()->subHours((int) $rawTimeFrame);
        } elseif (isset($query->time_unit) && in_array($query->time_unit, ['hour', 'hours'])) {
            $dateLimit = Carbon::now()->subHours((int) $rawTimeFrame);
        } else {
            $dateLimit = Carbon::now()->subDays((int) $rawTimeFrame);
        }

        $totalVotesTimeframe = Vote::select('id', 'user_id', 'poll_id', 'created_at')->where('created_at', '>=', $dateLimit)->count();
        $pollsCreatedTimeframe = Poll::select('id', 'title', 'created_at')->where('created_at', '>=', $dateLimit)->count();

        $type = $query?->type ?? 'poll';
        switch ($type) {
            case 'poll':
                $tableData = Poll::select('id', 'title', 'created_at')->latest()->paginate(10);
                break;
            case 'vote':
                $tableData = Vote::select('id', 'user_id', 'poll_id', 'created_at')->latest()->paginate(10);
                break;
            default:    
                $tableData = Poll::select('id', 'title', 'created_at')->latest()->paginate(10);
                break;
        }

        return [
            'users_active' => $activeUsers,
            'polls_created' => $pollsCreatedTimeframe,
            'votes_casted' => $totalVotesTimeframe,
            'tableData' => collect($tableData->items())->map(fn($x) => [
                'id' => $x->id,
                'title' => $x->title ?? null,
                'created_at' => $x->created_at,
            ])
        ];
    }
}