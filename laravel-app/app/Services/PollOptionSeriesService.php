<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\Vote;
use App\Services\Reports\ReportWindow;
use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

/**
 * Per-option standings + per-option vote series for one poll.
 *
 * Grafana mapping: `standings` → pie / bar-gauge panel, `series` → stacked
 * timeseries or race panel, `totals` → turnout (votes + unique voters) panel.
 * Same ApiResponse envelope as every other provider endpoint.
 *
 * Buckets are computed in PHP (not DATE_FORMAT) so MySQL and SQLite agree.
 */
final class PollOptionSeriesService
{
    public static function generate(Request $req, Poll $poll): array
    {
        $validated = $req->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'bucket' => ['nullable', 'in:hour,day,week'],
        ]);

        $window = self::window($validated, $poll);

        // ponytail: finalized polls are immutable → cache 1h; live polls 30s (KPI staleness is fine).
        $ttl = $poll->is_finalized ? 3600 : 30;
        $key = "poll:{$poll->id}:option-series:{$window->bucket}:{$window->from->getTimestamp()}:{$window->to->getTimestamp()}:{$poll->updated_at}";

        return Cache::remember($key, $ttl, fn () => self::compute($poll, $window, $ttl));
    }

    /**
     * Explicit [from, to] when the desktop time picker sends one, otherwise the
     * whole poll lifetime so the endpoint works with zero params.
     */
    private static function window(array $validated, Poll $poll): ReportWindow
    {
        $from = $validated['from'] ?? $poll->start_date?->toIso8601String() ?? now()->subDay()->toIso8601String();
        $to = $validated['to'] ?? now()->toIso8601String();

        return ReportWindow::make($from, $to, $validated['bucket'] ?? null, false);
    }

    private static function compute(Poll $poll, ReportWindow $window, int $ttl): array
    {
        $options = $poll->options()->orderBy('display_order')->get(['id', 'value', 'display_order']);

        // ponytail: one bounded window query, then bucket in PHP. A grouped SQL query would need
        // DATE_FORMAT (MySQL-only); this stays portable and voters-distinct comes out for free.
        // Ceiling: very large polls fetch one row per vote in the window — paginate the window if that bites.
        $votes = Vote::where('poll_id', $poll->id)
            ->whereBetween('voted_at', $window->bounds())
            ->get(['option_id', 'user_id', 'voted_at']);

        $perOption = [];
        $votersPerBucket = [];
        foreach ($votes as $vote) {
            $key = self::bucketKey($vote->voted_at, $window->bucket);
            $perOption[$vote->option_id][$key] = ($perOption[$vote->option_id][$key] ?? 0) + 1;
            $votersPerBucket[$key][$vote->user_id] = true;
        }
        $voterCounts = array_map(fn ($set) => count($set), $votersPerBucket);

        $totalVotes = $votes->count();
        $standings = [];
        $series = [];
        foreach ($options as $option) {
            $count = array_sum($perOption[$option->id] ?? []);
            $share = $totalVotes > 0 ? round($count / $totalVotes * 100, 2) : 0;
            $standings[] = [
                'option_id' => $option->id,
                'value' => $option->value,
                'display_order' => $option->display_order,
                'votes' => $count,
                'share' => $share,
                'displayValue' => $share . '%',
            ];
            $series[] = [
                'option_id' => $option->id,
                'value' => $option->value,
                'points' => $window->fillSeries(['votes' => $perOption[$option->id] ?? []]),
            ];
        }

        return [
            'poll' => ['id' => $poll->id, 'title' => $poll->title],
            'window' => $window->toArray(),
            'generated_at' => now()->toIso8601String(),
            'refresh_after_seconds' => $ttl,
            'total_votes' => $totalVotes,
            'unique_voters' => $votes->pluck('user_id')->unique()->count(),
            'standings' => $standings,
            'series' => $series,
            'totals' => $window->fillSeries([
                'votes' => self::sumMaps($perOption),
                'voters' => $voterCounts,
            ]),
        ];
    }

    /** Merge per-option bucket maps into one bucket => total map. */
    private static function sumMaps(array $perOption): array
    {
        $merged = [];
        foreach ($perOption as $map) {
            foreach ($map as $key => $count) {
                $merged[$key] = ($merged[$key] ?? 0) + $count;
            }
        }

        return $merged;
    }

    /** Bucket key matching ReportWindow::keys() format for the given granularity. */
    public static function bucketKey(mixed $instant, string $bucket): string
    {
        $t = CarbonImmutable::parse($instant);

        return match ($bucket) {
            'hour' => $t->startOfHour()->format('Y-m-d H:00:00'),
            'day' => $t->startOfDay()->format('Y-m-d'),
            'week' => $t->startOfWeek(CarbonInterface::MONDAY)->format('Y-m-d'),
        };
    }
}
