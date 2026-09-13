<?php

namespace App\Services;
use App\Models\Comment;
use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /**
     * Get the authenticated user's latest polls.
     */
    public static function getUserPolls(User $user, int $limit = 3)
    {
        return Poll::where('creator_id', $user->id)
            ->with(['media', 'pollCategory', 'options'])
            ->withCount(['votes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

   public static function getUsersActiveCount(): int
{
    return DB::table('sessions')
        ->where('last_activity', '>=', now()->subMinutes(5)->getTimestamp())
        ->count();
}

    /**
     * Get the current trending poll (most voted in the last 7 days).
     */
    public static function getTrendingPoll()
    {
        return Poll::where('is_active', true)
            ->where('created_at', '>=', now()->subDays(7))
            ->with(['media', 'pollCategory', 'options', 'creator:id,username'])
            ->withCount(['votes', 'comments'])
            ->orderByDesc('votes_count')
            ->first();
    }
   public static function getAdminMetrics(Request $request)
    {
        $now = Carbon::now();

        // Read the time frame from the request, clamped to a sane range. Without a cap a large
        // time_frame (e.g. ?time_frame=100000000) makes the bucket loop below allocate one array
        // element per hour/day until the process runs out of memory and the server dies.
        $rawTimeFrame = $request->input('time_frame', 7);
        $timeUnit = $request->input('time_unit');
        $isHours = is_string($rawTimeFrame) && str_ends_with(strtolower($rawTimeFrame), 'h');
        $timeFrame = min(max(1, (int) $rawTimeFrame), 2160);

        if ($isHours || in_array($timeUnit, ['hour', 'hours'])) {
            $dateLimit = $now->copy()->subHours(min($timeFrame, 24 * 90)); // cap 90 days of hourly buckets
        } else {
            $dateLimit = $now->copy()->subDays(min($timeFrame, 365));      // cap 1 year of daily buckets
        }

        $totalVotesTimeframe = Vote::where('created_at', '>=', $dateLimit)->count();
        $pollsCreatedTimeframe = Poll::where('created_at', '>=', $dateLimit)->count();

        $tableType = $request->input('table_type', 'poll');

        // limit()->get() rather than paginate(): the response only maps items() and never uses the
        // pagination meta, so paginate() would spend an extra discarded COUNT(*) query per request.
        switch ($tableType) {
            case 'vote':
                $tableData = Vote::select('id', 'user_id', 'poll_id', 'created_at')
                    ->whereBetween('created_at', [$dateLimit, $now])
                    ->latest()
                    ->limit(10)
                    ->get();
                break;
            case 'poll':
            default:
                $tableData = Poll::select('id', 'title', 'created_at')
                    ->whereBetween('created_at', [$dateLimit, $now])
                    ->latest()
                    ->limit(10)
                    ->get();
                break;
        }

        $chartType = $request->input('chart_type', 'poll');
        $diffInHours = $now->diffInHours($dateLimit);

        if ($diffInHours <= 24) {
            $interval = 'hour';
            $dbFormat = '%Y-%m-%d %H:00:00';
            $carbonFormat = 'Y-m-d H:00:00';
            $labelFormat = 'H:i';
        } else {
            $interval = 'day';
            $dbFormat = '%Y-%m-%d';
            $carbonFormat = 'Y-m-d';
            $labelFormat = 'M d';
        }

        $queryBuilder = $chartType === 'vote' ? Vote::query() : Poll::query();
        $rawChartData = $queryBuilder
            ->where('created_at', '>=', $dateLimit)
            ->selectRaw("DATE_FORMAT(created_at, ?) as bucket, count(*) as count", [$dbFormat])
            ->groupBy('bucket')
            ->pluck('count', 'bucket');

        $current = $dateLimit->copy();

        if ($interval === 'hour') {
            $current->minute(0)->second(0);
        } else {
            $current->startOfDay();
        }

        // Step with native DateTimeImmutable, not Carbon: Carbon's addHour/addDay + format() are an
        // order of magnitude heavier per call, and for wide windows (up to ~2160 buckets) that loop
        // cost — not the DB — was the P90 driver. add(P1D/PT1H) stays calendar/DST-correct.
        $chartData = [];
        $maxBuckets = 5000; // safety backstop; the time_frame clamp above already bounds this
        $endTs = $now->getTimestamp();
        $cursor = (new \DateTimeImmutable('@' . $current->getTimestamp()))->setTimezone($now->getTimezone());
        $step = new \DateInterval($interval === 'hour' ? 'PT1H' : 'P1D');

        while ($cursor->getTimestamp() <= $endTs && count($chartData) < $maxBuckets) {
            $bucketKey = $cursor->format($carbonFormat);
            $chartData[] = [
                'key' => $cursor->format($labelFormat),
                'value' => (int) ($rawChartData[$bucketKey] ?? 0),
            ];
            $cursor = $cursor->add($step);
        }

        // Return a structural array format wrapped for clean JSON output
        return [
            'success' => true,
            'message' => 'Metrics retrieved successfully.',
            'data' => [
                'users_active' => self::getUsersActiveCount(),
                'polls_created' => $pollsCreatedTimeframe,
                'votes_casted' => $totalVotesTimeframe,
                'chart_data' => $chartData,
                'table_data' => $tableData->map(fn($x) => [
                    'id' => (string) $x->id,
                    'title' => $x->title ?? ($x->poll_id ?? ''),
                    'created_at' => (string) $x->created_at,
                ])->values()->all(),
            ]
        ];
    }

    /**
     * Platform healthcheck report — application-level health signals for the provider.
     * Liveness is covered natively by Laravel's /up endpoint; this reports operational metrics.
     */
    public static function getPlatformHealth(): array
    {
        // ~10 aggregate COUNTs (several full-table). Operational metrics tolerate staleness, so cache
        // briefly to keep this admin endpoint well under the P90 budget under repeated polling.
        return Cache::remember('dashboard:platform-health', 30, fn () => self::computePlatformHealth());
    }

    private static function computePlatformHealth(): array
    {
        $now = now();
        // Ended but not finalized → the finalization flow is behind. The one operational red flag.
        $pendingFinalization = Poll::where('end_date', '<=', $now)
            ->where('is_finalized', false)
            ->count();

        return [
            'status' => $pendingFinalization === 0 ? 'ok' : 'attention',
            'generated_at' => $now->toIso8601String(),
            'active_users' => self::getUsersActiveCount(),
            'votes_last_24h' => Vote::where('created_at', '>=', $now->copy()->subDay())->count(),
            'totals' => [
                'users' => User::count(),
                'polls' => Poll::count(),
                'votes' => Vote::count(),
                'comments' => Comment::count(),
            ],
            'polls' => [
                'active' => Poll::where('is_active', true)->count(),
                'finalized' => Poll::where('is_finalized', true)->count(),
                'pending_finalization' => $pendingFinalization,
            ],
        ];
    }
}
