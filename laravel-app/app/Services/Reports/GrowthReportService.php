<?php

namespace App\Services\Reports;

use App\Enums\UserRole;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Growth & Activation report (admin/provider only).
 *
 * Answers "is the platform actually growing, and do new users become voters?"
 * for a dynamic [from, to] window. Uses hybrid anchors: signups on
 * users.created_at, activity on votes.voted_at / comments.created_at.
 */
class GrowthReportService
{
    /** A signup is "activated" if it cast its first vote within this many minutes. */
    private const ACTIVATION_MINUTES = 24 * 60;

    public static function generate(ReportWindow $window): array
    {
        [$from, $to] = $window->bounds();

        $newUsers = self::newUsers($from, $to);
        $votesCast = self::votesCast($from, $to);
        $activeVoters = self::activeVoters($from, $to);

        [$activationRate, $medianTtfv, $funnel] = self::cohort($from, $to);
        [$returningVoters, $retentionRate] = self::retention($window);

        $metrics = [];
        $metrics[] = self::metric('new_users', 'Pengguna Baru', $newUsers, 'number', $window, fn ($f, $t) => self::newUsers($f, $t));
        $metrics[] = self::metric('active_voters', 'Pemilih Aktif', $activeVoters, 'number', $window, fn ($f, $t) => self::activeVoters($f, $t));
        $metrics[] = self::metric('votes_cast', 'Suara Masuk', $votesCast, 'number', $window, fn ($f, $t) => self::votesCast($f, $t));

        $metrics[] = [
            'key' => 'activation_rate',
            'label' => 'Aktivasi 24 Jam',
            'value' => $activationRate,
            'displayValue' => round($activationRate) . '%',
            'type' => 'percent',
            'unit' => '%',
            'highlight' => true,
        ];
        $metrics[] = [
            'key' => 'median_time_to_first_vote',
            'label' => 'Median Waktu ke Suara Pertama',
            'value' => $medianTtfv,
            'type' => 'duration',
            'unit' => 'menit',
        ];
        $metrics[] = ['key' => 'returning_voters', 'label' => 'Pemilih Kembali', 'value' => $returningVoters, 'type' => 'number'];
        $metrics[] = [
            'key' => 'retention_rate',
            'label' => 'Retensi Periode Sebelumnya',
            'value' => $retentionRate,
            'displayValue' => round($retentionRate) . '%',
            'type' => 'percent',
            'unit' => '%',
        ];

        return [
            'report' => 'growth',
            'window' => $window->toArray(),
            'compare' => $window->compare ? $window->previous()->toArray() : null,
            'generated_at' => now()->toIso8601String(),
            'metrics' => $metrics,
            'funnel' => $funnel,
            'series' => self::series($window),
        ];
    }

    private static function newUsers($from, $to): int
    {
        return DB::table('users')
            ->where('role', '!=', UserRole::ADMIN->value)
            ->whereBetween('created_at', [$from, $to])
            ->count();
    }

    private static function votesCast($from, $to): int
    {
        return DB::table('votes')->whereBetween('voted_at', [$from, $to])->count();
    }

    private static function activeVoters($from, $to): int
    {
        return (int) DB::table('votes')
            ->whereBetween('voted_at', [$from, $to])
            ->distinct()
            ->count('user_id');
    }

    /**
     * Signup-cohort activation + funnel: of users who registered in the window,
     * how many voted within 24h, the median time-to-first-vote, and how far the
     * cohort progressed (registered → voted → commented → created a poll).
     *
     * @return array{0:float,1:int,2:array<int,array<string,mixed>>}
     */
    private static function cohort($from, $to): array
    {
        $signups = DB::table('users')
            ->where('role', '!=', UserRole::ADMIN->value)
            ->whereBetween('created_at', [$from, $to])
            ->pluck('created_at', 'id'); // id => created_at

        $registered = $signups->count();
        if ($registered === 0) {
            return [0.0, 0, self::funnelRows(0, 0, 0, 0)];
        }

        $ids = $signups->keys()->all();

        $firstVotes = DB::table('votes')
            ->whereIn('user_id', $ids)
            ->groupBy('user_id')
            ->selectRaw('user_id, MIN(voted_at) as first_vote')
            ->pluck('first_vote', 'user_id');

        $activated = 0;
        $ttfv = [];
        foreach ($signups as $id => $createdAt) {
            if (! isset($firstVotes[$id])) {
                continue;
            }
            $minutes = intdiv(
                Carbon::parse($firstVotes[$id])->getTimestamp() - Carbon::parse($createdAt)->getTimestamp(),
                60
            );
            if ($minutes < 0) {
                continue; // temporal noise guard
            }
            $ttfv[] = $minutes;
            if ($minutes <= self::ACTIVATION_MINUTES) {
                $activated++;
            }
        }

        $voted = count($ttfv);
        $commented = (int) DB::table('comments')->whereIn('user_id', $ids)->distinct()->count('user_id');
        $created = (int) DB::table('polls')->whereIn('creator_id', $ids)->distinct()->count('creator_id');

        $activationRate = round($activated / $registered * 100, 2);
        $medianTtfv = self::median($ttfv);

        return [$activationRate, $medianTtfv, self::funnelRows($registered, $voted, $commented, $created)];
    }

    /**
     * Returning voters: distinct users who voted in this window AND in the equal
     * prior window. retention_rate is relative to the prior window's voter base.
     *
     * @return array{0:int,1:float}
     */
    private static function retention(ReportWindow $window): array
    {
        [$from, $to] = $window->bounds();
        $prev = $window->previous();
        [$prevFrom, $prevTo] = $prev->bounds();

        $current = DB::table('votes')->whereBetween('voted_at', [$from, $to])->distinct()->pluck('user_id');
        $prior = DB::table('votes')->whereBetween('voted_at', [$prevFrom, $prevTo])->distinct()->pluck('user_id');

        if ($prior->isEmpty()) {
            return [0, 0.0];
        }

        $returning = $current->intersect($prior)->count();

        return [$returning, round($returning / $prior->count() * 100, 2)];
    }

    private static function series(ReportWindow $window): array
    {
        [$from, $to] = $window->bounds();

        $signupMap = DB::table('users')
            ->where('role', '!=', UserRole::ADMIN->value)
            ->whereBetween('created_at', [$from, $to])
            ->selectRaw($window->bucketExpr('created_at') . ' as b, count(*) as c')
            ->groupBy('b')->pluck('c', 'b')->all();

        $voterMap = DB::table('votes')
            ->whereBetween('voted_at', [$from, $to])
            ->selectRaw($window->bucketExpr('voted_at') . ' as b, count(distinct user_id) as c')
            ->groupBy('b')->pluck('c', 'b')->all();

        $voteMap = DB::table('votes')
            ->whereBetween('voted_at', [$from, $to])
            ->selectRaw($window->bucketExpr('voted_at') . ' as b, count(*) as c')
            ->groupBy('b')->pluck('c', 'b')->all();

        return $window->fillSeries([
            'new_users' => $signupMap,
            'active_voters' => $voterMap,
            'votes' => $voteMap,
        ]);
    }

    /**
     * Build a metric with an optional period-over-period delta when compare is on.
     *
     * @param  callable(mixed,mixed):int  $priorFn
     */
    private static function metric(string $key, string $label, int $value, string $type, ReportWindow $window, callable $priorFn): array
    {
        $metric = ['key' => $key, 'label' => $label, 'value' => $value, 'type' => $type];

        if ($window->compare) {
            [$pf, $pt] = $window->previous()->bounds();
            $prior = $priorFn($pf, $pt);
            $metric['delta'] = self::delta($value, $prior);
        }

        return $metric;
    }

    private static function delta(int $current, int $prior): array
    {
        $diff = $current - $prior;
        $pct = $prior > 0 ? round($diff / $prior * 100, 2) : null;

        return [
            'value' => $diff,
            'pct' => $pct,
            'direction' => $diff > 0 ? 'up' : ($diff < 0 ? 'down' : 'flat'),
            'prior' => $prior,
        ];
    }

    private static function funnelRows(int $registered, int $voted, int $commented, int $created): array
    {
        $pct = fn (int $n) => $registered > 0 ? round($n / $registered * 100, 2) : 0.0;

        return [
            ['stage' => 'registered', 'label' => 'Terdaftar', 'count' => $registered, 'pct' => 100.0],
            ['stage' => 'voted', 'label' => 'Memilih', 'count' => $voted, 'pct' => $pct($voted)],
            ['stage' => 'commented', 'label' => 'Berkomentar', 'count' => $commented, 'pct' => $pct($commented)],
            ['stage' => 'created_poll', 'label' => 'Membuat Poll', 'count' => $created, 'pct' => $pct($created)],
        ];
    }

    /** @param array<int,int> $values */
    private static function median(array $values): int
    {
        if (empty($values)) {
            return 0;
        }
        sort($values);
        $n = count($values);
        $mid = intdiv($n, 2);

        return $n % 2 ? $values[$mid] : intdiv($values[$mid - 1] + $values[$mid], 2);
    }
}
