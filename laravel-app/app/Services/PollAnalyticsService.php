<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteAuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

/**
 * Provider-facing per-poll analytics. Every KPI is computed from existing data only
 * (see tmp/kpi_matrix.md). Same ApiResponse envelope + metrics[] shape as the end-user report.
 */
class PollAnalyticsService
{
    public static function generate(Request $req, Poll $poll): array
    {
        $bucket = in_array($req->query('bucket'), ['hour', 'day'], true) ? $req->query('bucket') : null;

        // ponytail: finalized polls are immutable → cache 1h; live polls 30s (KPI staleness is fine).
        $ttl = $poll->is_finalized ? 3600 : 30;
        $key = "poll:{$poll->id}:analytics:" . ($bucket ?? 'auto') . ":{$poll->updated_at}";

        return Cache::remember($key, $ttl, fn () => self::compute($poll, $bucket));
    }

    private static function compute(Poll $poll, ?string $bucket): array
    {
        $result       = $poll->result; // PollResult|null (winner/total_votes precomputed at finalize)
        $totalVotes   = $result?->total_votes ?? Vote::where('poll_id', $poll->id)->count();
        $uniqueVoters = Vote::where('poll_id', $poll->id)->distinct()->count('user_id');
        $eligible     = Cache::remember('users:count', 300, fn () => User::count());
        $comments     = $poll->comments()->count();

        // Per-option counts, desc — for margin / concentration / utilization.
        $optionVotes  = $poll->options()->withCount('votes')->get()
            ->pluck('votes_count')->sortDesc()->values();
        $optionsTotal = $optionVotes->count();
        $optionsUsed  = $optionVotes->filter(fn ($c) => $c > 0)->count();
        $top1 = (int) $optionVotes->get(0, 0);
        $top2 = (int) $optionVotes->get(1, 0);

        // Timing.
        $start       = $poll->start_date;
        $end         = $poll->end_date;
        $closed      = $poll->isClosed();
        $status      = $poll->is_finalized ? 'finalized' : ($closed ? 'closed' : 'active');
        $durationMin = self::minutes($start, $end);
        $activeMin   = max(1, self::minutes($start, $closed ? $end : now()));
        $votesPerHour = round($totalVotes / ($activeMin / 60), 2);

        // Time buckets (reuses DashboardService::getAdminMetrics grouping pattern).
        $bucket   = $bucket ?? ($durationMin <= 2880 ? 'hour' : 'day'); // <=48h window → hourly
        $dbFormat = $bucket === 'hour' ? '%Y-%m-%d %H:00:00' : '%Y-%m-%d';
        $series   = Vote::where('poll_id', $poll->id)
            ->selectRaw('DATE_FORMAT(created_at, ?) as bucket, count(*) as votes', [$dbFormat])
            ->groupBy('bucket')->orderBy('bucket')->pluck('votes', 'bucket');
        $peak = $series->isNotEmpty() ? $series->sortDesc()->keys()->first() : null;

        $metrics = [];
        $push = function (array $m) use (&$metrics) { $metrics[] = $m; };

        $participation = $eligible > 0 ? $uniqueVoters / $eligible * 100 : 0;
        $push(['key' => 'participation_rate', 'label' => 'Partisipasi', 'value' => round($participation, 2), 'displayValue' => round($participation) . '%', 'type' => 'percent', 'unit' => '%']);
        $push(['key' => 'unique_voters', 'label' => 'Pemilih Unik', 'value' => $uniqueVoters, 'type' => 'number']);
        $push(['key' => 'total_votes', 'label' => 'Total Suara', 'value' => $totalVotes, 'type' => 'number']);

        if ($poll->allow_quorum && (int) $poll->quorum_count > 0) {
            $turnout = $totalVotes / $poll->quorum_count * 100;
            $push(['key' => 'turnout_vs_quorum', 'label' => 'Turnout vs Kuorum', 'value' => round($turnout, 2), 'displayValue' => round($turnout) . '%', 'type' => 'percent', 'unit' => '%', 'highlight' => true]);

            // Timestamp of the quorum-th vote → minutes from start. Null metric if quorum never reached.
            $nth = Vote::where('poll_id', $poll->id)->orderBy('voted_at')->skip($poll->quorum_count - 1)->first();
            if ($nth) {
                $push(['key' => 'time_to_quorum', 'label' => 'Waktu Capai Kuorum', 'value' => self::minutes($start, $nth->voted_at), 'type' => 'duration', 'unit' => 'menit']);
            }
        }

        $push(['key' => 'vote_velocity', 'label' => 'Kecepatan Suara', 'value' => $votesPerHour, 'displayValue' => $votesPerHour . '/jam', 'type' => 'number', 'unit' => '/jam']);
        if ($peak) {
            $push(['key' => 'peak_voting_window', 'label' => 'Puncak Aktivitas', 'value' => $peak, 'type' => 'text']);
        }

        if ($poll->is_finalized && $result) {
            $push(['key' => 'finalization_latency', 'label' => 'Jeda Finalisasi', 'value' => self::minutes($end, $result->created_at), 'type' => 'duration', 'unit' => 'menit']);
        }

        $margin = $totalVotes > 0 ? ($top1 - $top2) / $totalVotes * 100 : 0;
        $conc   = $totalVotes > 0 ? $top1 / $totalVotes * 100 : 0;
        $push(['key' => 'winner_margin', 'label' => 'Selisih Pemenang', 'value' => round($margin, 2), 'displayValue' => round($margin) . '%', 'type' => 'percent', 'unit' => '%']);
        $push(['key' => 'vote_concentration', 'label' => 'Konsentrasi Suara', 'value' => round($conc, 2), 'displayValue' => round($conc) . '%', 'type' => 'percent', 'unit' => '%']);

        $util = $optionsTotal > 0 ? $optionsUsed / $optionsTotal * 100 : 0;
        $push(['key' => 'options_utilized', 'label' => 'Opsi Terpakai', 'value' => round($util, 2), 'displayValue' => "$optionsUsed/$optionsTotal", 'type' => 'percent', 'unit' => '%']);

        $engagement = $uniqueVoters > 0 ? round($comments / $uniqueVoters, 2) : 0;
        $push(['key' => 'comment_engagement', 'label' => 'Keterlibatan Komentar', 'value' => $engagement, 'type' => 'number']);

        // ponytail: counts audit-log rows per platform (all actions) — approximates channel mix.
        // Filter ->where('action', VoteActions::CAST) if you need vote-only attribution.
        $platforms = VoteAuditLog::where('poll_id', $poll->id)
            ->selectRaw('platform, count(*) as c')->groupBy('platform')->pluck('c', 'platform');
        $push(['key' => 'platform_split', 'label' => 'Distribusi Platform', 'value' => $platforms, 'type' => 'breakdown']);

        $push(['key' => 'poll_status', 'label' => 'Status', 'value' => $status, 'type' => 'text']);
        $push(['key' => 'poll_duration', 'label' => 'Durasi', 'value' => $durationMin, 'type' => 'duration', 'unit' => 'menit']);

        return [
            'poll' => [
                'id' => $poll->id,
                'title' => $poll->title,
                'status' => $status,
                'start_date' => $start?->toIso8601String(),
                'end_date' => $end?->toIso8601String(),
                'duration_minutes' => $durationMin,
            ],
            'generated_at' => now()->toIso8601String(),
            'metrics' => $metrics,
            'timeseries' => [
                'bucket' => $bucket,
                'points' => $series->map(fn ($v, $k) => ['bucket' => $k, 'votes' => (int) $v])->values()->all(),
            ],
        ];
    }

    /**
     * Comment analytics for a poll — count, unique commenters, content over time, recent content.
     * Same envelope/caching as generate(). Backs GET /api/analytics/polls/{poll}/comments.
     */
    public static function commentAnalytics(Request $req, Poll $poll): array
    {
        $bucket = in_array($req->query('bucket'), ['hour', 'day'], true) ? $req->query('bucket') : null;

        $ttl = $poll->is_finalized ? 3600 : 30;
        $key = "poll:{$poll->id}:comment-analytics:" . ($bucket ?? 'auto') . ":{$poll->updated_at}";

        return Cache::remember($key, $ttl, fn () => self::computeComments($poll, $bucket));
    }

    private static function computeComments(Poll $poll, ?string $bucket): array
    {
        $total      = $poll->comments()->count();
        $commenters = $poll->comments()->distinct()->count('user_id');
        $voters     = Vote::where('poll_id', $poll->id)->distinct()->count('user_id');

        $durationMin = self::minutes($poll->start_date, $poll->end_date);
        $bucket      = $bucket ?? ($durationMin > 0 && $durationMin <= 2880 ? 'hour' : 'day');
        $dbFormat    = $bucket === 'hour' ? '%Y-%m-%d %H:00:00' : '%Y-%m-%d';
        $series      = $poll->comments()
            ->selectRaw('DATE_FORMAT(created_at, ?) as bucket, count(*) as comments', [$dbFormat])
            ->groupBy('bucket')->orderBy('bucket')->pluck('comments', 'bucket');
        $peak = $series->isNotEmpty() ? $series->sortDesc()->keys()->first() : null;

        $recent = $poll->comments()->with('user:id,username')->latest()->limit(10)->get()
            ->map(fn ($c) => [
                'id'         => $c->id,
                'user'       => $c->user?->username,
                'content'    => $c->content,
                'created_at' => $c->created_at?->toIso8601String(),
            ])->all();

        $metrics = [];
        $metrics[] = ['key' => 'total_comments', 'label' => 'Total Komentar', 'value' => $total, 'type' => 'number'];
        $metrics[] = ['key' => 'unique_commenters', 'label' => 'Komentator Unik', 'value' => $commenters, 'type' => 'number'];

        $perCommenter = $commenters > 0 ? round($total / $commenters, 2) : 0;
        $metrics[] = ['key' => 'comments_per_commenter', 'label' => 'Komentar per Komentator', 'value' => $perCommenter, 'type' => 'number'];

        $conversion = $voters > 0 ? $commenters / $voters * 100 : 0;
        $metrics[] = ['key' => 'commenter_conversion', 'label' => 'Komentator dari Pemilih', 'value' => round($conversion, 2), 'displayValue' => round($conversion) . '%', 'type' => 'percent', 'unit' => '%'];

        if ($peak) {
            $metrics[] = ['key' => 'peak_comment_window', 'label' => 'Puncak Komentar', 'value' => $peak, 'type' => 'text'];
        }

        return [
            'poll' => ['id' => $poll->id, 'title' => $poll->title],
            'generated_at' => now()->toIso8601String(),
            'metrics' => $metrics,
            'timeseries' => [
                'bucket' => $bucket,
                'points' => $series->map(fn ($v, $k) => ['bucket' => $k, 'comments' => (int) $v])->values()->all(),
            ],
            'recent' => $recent,
        ];
    }

    /**
     * Whole minutes between two instants, version-proof across Carbon 2/3 and raw string columns
     * (votes.voted_at is not cast). Always non-negative.
     */
    public static function minutes($a, $b): int
    {
        if (! $a || ! $b) {
            return 0;
        }

        return intdiv(abs(Carbon::parse($a)->getTimestamp() - Carbon::parse($b)->getTimestamp()), 60);
    }
}
