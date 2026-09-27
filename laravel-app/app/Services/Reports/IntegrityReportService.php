<?php

namespace App\Services\Reports;

use App\Enums\VoteActions;
use Illuminate\Support\Facades\DB;

/**
 * Integrity & Abuse radar (admin/provider only).
 *
 * Mines vote_audit_logs (IP, platform, user-agent, timing) for the [from, to]
 * window to surface multi-account / ballot-stuffing signals. Note: the app
 * blocks re-votes by design, so only action=created rows exist — there is no
 * vote-change/flip-flop signal to report.
 */
class IntegrityReportService
{
    /** An IP behind at least this many distinct accounts is treated as a cluster. */
    private const SHARED_IP_USER_THRESHOLD = 3;

    /** Votes struck before this hour (local) count as off-hours. */
    private const OFF_HOURS_BEFORE = 5;

    public static function generate(ReportWindow $window): array
    {
        [$from, $to] = $window->bounds();

        $total = self::baseCount($from, $to);
        $uniqueVoters = (int) self::base($from, $to)->distinct()->count('performed_by_user_id');
        $uniqueIps = (int) self::base($from, $to)->distinct()->count('performed_by_user_ip');

        // Per-IP fan-out: votes and distinct accounts behind each IP.
        $ipStats = self::base($from, $to)
            ->selectRaw('performed_by_user_ip as ip, count(*) as votes, count(distinct performed_by_user_id) as users')
            ->groupBy('performed_by_user_ip')
            ->get();

        $maxUsersPerIp = (int) ($ipStats->max('users') ?? 0);
        $sharedClusters = $ipStats->where('users', '>=', self::SHARED_IP_USER_THRESHOLD)->count();

        $flagged = $ipStats->sortByDesc('users')->take(10)->values()->map(fn ($r) => [
            'ip' => $r->ip,
            'votes' => (int) $r->votes,
            'distinct_users' => (int) $r->users,
            'suspicious' => (int) $r->users >= self::SHARED_IP_USER_THRESHOLD,
        ])->all();

        // Burst: the single busiest minute in the window.
        $burst = self::base($from, $to)
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:00') as minute, count(*) as c")
            ->groupBy('minute')->orderByDesc('c')->first();

        $offHours = self::base($from, $to)->whereRaw('HOUR(created_at) < ?', [self::OFF_HOURS_BEFORE])->count();
        $offHoursShare = $total > 0 ? round($offHours / $total * 100, 2) : 0.0;

        $platforms = self::base($from, $to)
            ->selectRaw('COALESCE(platform, ?) as platform, count(*) as c', ['Unknown'])
            ->groupBy('platform')->pluck('c', 'platform')->all();

        $status = ($sharedClusters > 0 || $maxUsersPerIp >= self::SHARED_IP_USER_THRESHOLD) ? 'attention' : 'ok';

        $metrics = [];
        $metrics[] = self::metric('votes_in_window', 'Suara pada Rentang', $total, 'number', $window, fn ($f, $t) => self::baseCount($f, $t));
        $metrics[] = ['key' => 'unique_voters', 'label' => 'Pemilih Unik', 'value' => $uniqueVoters, 'type' => 'number'];
        $metrics[] = ['key' => 'unique_ips', 'label' => 'IP Unik', 'value' => $uniqueIps, 'type' => 'number'];
        $metrics[] = [
            'key' => 'max_accounts_per_ip',
            'label' => 'Akun Terbanyak per IP',
            'value' => $maxUsersPerIp,
            'type' => 'number',
            'highlight' => $maxUsersPerIp >= self::SHARED_IP_USER_THRESHOLD,
        ];
        $metrics[] = ['key' => 'shared_ip_clusters', 'label' => 'Klaster IP Bersama', 'value' => $sharedClusters, 'type' => 'number'];
        $metrics[] = [
            'key' => 'off_hours_share',
            'label' => 'Porsi Dini Hari',
            'value' => $offHoursShare,
            'displayValue' => round($offHoursShare) . '%',
            'type' => 'percent',
            'unit' => '%',
        ];
        $metrics[] = [
            'key' => 'peak_burst',
            'label' => 'Puncak per Menit',
            'value' => (int) ($burst->c ?? 0),
            'displayValue' => $burst ? ((int) $burst->c . ' @ ' . $burst->minute) : '0',
            'type' => 'number',
        ];
        $metrics[] = ['key' => 'integrity_status', 'label' => 'Status Integritas', 'value' => $status, 'type' => 'text', 'highlight' => $status !== 'ok'];
        $metrics[] = ['key' => 'platform_split', 'label' => 'Distribusi Platform', 'value' => $platforms, 'type' => 'breakdown'];

        $series = self::base($from, $to)
            ->selectRaw($window->bucketExpr('created_at') . ' as b, count(*) as c')
            ->groupBy('b')->pluck('c', 'b')->all();

        return [
            'report' => 'integrity',
            'window' => $window->toArray(),
            'compare' => $window->compare ? $window->previous()->toArray() : null,
            'generated_at' => now()->toIso8601String(),
            'status' => $status,
            'metrics' => $metrics,
            'flagged_ips' => $flagged,
            'series' => $window->fillSeries(['votes' => $series]),
        ];
    }

    /** Base query: created (cast) audit rows within the window. */
    private static function base($from, $to)
    {
        return DB::table('vote_audit_logs')
            ->where('action', VoteActions::CREATED->value)
            // Poll/comment lifecycle rows share this table — integrity is vote-only.
            ->whereNotNull('vote_id')
            ->whereBetween('created_at', [$from, $to]);
    }

    private static function baseCount($from, $to): int
    {
        return self::base($from, $to)->count();
    }

    private static function metric(string $key, string $label, int $value, string $type, ReportWindow $window, callable $priorFn): array
    {
        $metric = ['key' => $key, 'label' => $label, 'value' => $value, 'type' => $type];

        if ($window->compare) {
            [$pf, $pt] = $window->previous()->bounds();
            $prior = $priorFn($pf, $pt);
            $diff = $value - $prior;
            $metric['delta'] = [
                'value' => $diff,
                'pct' => $prior > 0 ? round($diff / $prior * 100, 2) : null,
                'direction' => $diff > 0 ? 'up' : ($diff < 0 ? 'down' : 'flat'),
                'prior' => $prior,
            ];
        }

        return $metric;
    }
}
