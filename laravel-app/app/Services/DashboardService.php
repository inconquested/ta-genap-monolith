<?php

namespace App\Services;
use App\Models\Poll;
use App\Models\Vote;
use Carbon\Carbon;

class DashboardService
{
    public static function getAdminMetrics(?object $query = null)
    {
        $now = Carbon::now();
        $activeUsers = \Illuminate\Support\Facades\DB::table('sessions')
            ->whereNotNull('user_id')
            ->where('last_activity', '>=', $now->copy()->subMinutes(15))
            ->count() - 1;

        $rawTimeFrame = $query?->time_frame ?? 7;
        if (is_string($rawTimeFrame) && str_ends_with(strtolower($rawTimeFrame), 'h')) {
            $dateLimit = $now->copy()->subHours((int) $rawTimeFrame);
        } elseif (isset($query->time_unit) && in_array($query->time_unit, ['hour', 'hours'])) {
            $dateLimit = $now->copy()->subHours((int) $rawTimeFrame);
        } else {
            $dateLimit = $now->copy()->subDays((int) $rawTimeFrame);
        }

        $totalVotesTimeframe = Vote::select('id')->where('created_at', '>=', $dateLimit)->count();
        $pollsCreatedTimeframe = Poll::select('id')->where('created_at', '>=', $dateLimit)->count();

        $tableType = $query?->table_type ?? 'poll';
        switch ($tableType) {
            case 'poll':
                $tableData = Poll::select('id', 'title', 'created_at')
                    ->whereBetween('created_at', [$dateLimit, $now])
                    ->latest()
                    ->paginate(10);
                break;
            case 'vote':
                $tableData = Vote::select('id', 'user_id', 'poll_id', 'created_at')
                    ->whereBetween('created_at', [$dateLimit, $now])
                    ->latest()
                    ->paginate(10);
                break;
            default:
                $tableData = Poll::select('id', 'title', 'created_at')
                    ->whereBetween('created_at', [$dateLimit, $now])
                    ->latest()
                    ->paginate(10);
                break;
        }

        $chartType = $query?->chart_type ?? 'poll';
        $diffInHours = $now->diffInHours($dateLimit);

        if ($diffInHours <= 24) {
            $interval = 'hour';
            $dbFormat = '%Y-%m-%d %H:00:00';
            $carbonFormat = 'Y-m-d H:00:00';
            $labelFormat = 'H:i';
            $stepMethod = 'addHour';
        } else {
            $interval = 'day';
            $dbFormat = '%Y-%m-%d';
            $carbonFormat = 'Y-m-d';
            $labelFormat = 'M d';
            $stepMethod = 'addDay';
        }

        $queryBuilder = $chartType === 'vote' ? Vote::query() : Poll::query();
        $rawChartData = $queryBuilder
            ->where('created_at', '>=', $dateLimit)
            ->selectRaw("DATE_FORMAT(created_at, ?) as bucket, count(*) as count", [$dbFormat])
            ->groupBy('bucket')
            ->pluck('count', 'bucket');

        $chartData = [];
        $current = $dateLimit->copy();

        if ($interval === 'hour') {
            $current->minute(0)->second(0);
        } else {
            $current->startOfDay();
        }

        while ($current <= $now) {
            $bucketKey = $current->format($carbonFormat);
            $chartData[] = [
                'key' => $current->format($labelFormat),
                'value' => (int) ($rawChartData[$bucketKey] ?? 0),
            ];
            $current->$stepMethod();
        }

        return [
            'users_active' => 1,
            'polls_created' => $pollsCreatedTimeframe,
            'votes_casted' => $totalVotesTimeframe,
            'chart_data' => $chartData,
            'table_data' => collect($tableData->items())->map(fn($x) => [
                'id' => $x->id,
                'title' => $x->title ?? null,
                'created_at' => $x->created_at,
            ])
        ];
    }
}