<?php

namespace App\Services\Reports;

use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;
use DateInterval;
use InvalidArgumentException;

/**
 * Immutable time window shared by every admin report.
 *
 * The window is fully dynamic — driven by explicit `from`/`to` instants, never a
 * preset. `bucket` (hour|day|week) controls time-series granularity and is
 * auto-selected from the range when the client omits it, then coarsened so a
 * hostile range can never generate an unbounded number of series points.
 *
 * Metrics anchor on their own timestamp column (users→created_at, votes→voted_at,
 * audit→created_at); this object only holds the bounds/bucket and knows how to
 * (a) emit the SQL grouping expression for a given column and (b) enumerate the
 * ordered bucket keys so series can be gap-filled.
 */
final class ReportWindow
{
    public const BUCKETS = ['hour', 'day', 'week'];

    /** Hard cap on generated series points (mirrors DashboardService's bucket backstop). */
    private const MAX_POINTS = 750;

    public function __construct(
        public readonly CarbonImmutable $from,
        public readonly CarbonImmutable $to,
        public readonly string $bucket,
        public readonly bool $compare,
    ) {
    }

    /**
     * Build from raw client input. `$from`/`$to` are required, parseable instants.
     */
    public static function make(string $from, string $to, ?string $bucket = null, bool $compare = false): self
    {
        $f = CarbonImmutable::parse($from);
        $t = CarbonImmutable::parse($to);

        if ($t->getTimestamp() < $f->getTimestamp()) {
            throw new InvalidArgumentException("'to' must be on or after 'from'.");
        }

        $bucket = in_array($bucket, self::BUCKETS, true) ? $bucket : self::autoBucket($f, $t);
        $bucket = self::fit($f, $t, $bucket);

        return new self($f, $t, $bucket, $compare);
    }

    /** The equal-length window immediately preceding this one (for period-over-period deltas). */
    public function previous(): self
    {
        $length = $this->to->getTimestamp() - $this->from->getTimestamp();

        return new self(
            $this->from->subSeconds($length),
            $this->from,
            $this->bucket,
            false,
        );
    }

    /** Inclusive [from, to] bounds as a whereBetween-ready pair. */
    public function bounds(): array
    {
        return [$this->from, $this->to];
    }

    /** MySQL expression that groups the given column into this window's buckets. */
    public function bucketExpr(string $column): string
    {
        return match ($this->bucket) {
            'hour' => "DATE_FORMAT($column, '%Y-%m-%d %H:00:00')",
            'day' => "DATE_FORMAT($column, '%Y-%m-%d')",
            // WEEKDAY() is Monday=0, so this collapses to the Monday date of each ISO week —
            // matching the Monday-aligned cursor in keys().
            'week' => "DATE(DATE_SUB($column, INTERVAL WEEKDAY($column) DAY))",
        };
    }

    /**
     * Ordered list of every bucket key spanning [from, to]. Used to gap-fill a
     * grouped pluck so the series has no holes.
     *
     * @return array<int,string>
     */
    public function keys(): array
    {
        $cursor = $this->floor($this->from);
        $step = $this->step();
        $endTs = $this->to->getTimestamp();

        $keys = [];
        while ($cursor->getTimestamp() <= $endTs && count($keys) < self::MAX_POINTS) {
            $keys[] = $this->keyFor($cursor);
            $cursor = $cursor->add($step);
        }

        return $keys;
    }

    /**
     * Zip one or more grouped-count maps (bucketKey => count) into a dense,
     * ordered series. Each entry carries every requested field, defaulting to 0.
     *
     * @param  array<string,array<string,int>>  $named  field name => (bucketKey => count)
     * @return array<int,array<string,mixed>>
     */
    public function fillSeries(array $named): array
    {
        $points = [];
        foreach ($this->keys() as $key) {
            $point = ['bucket' => $key];
            foreach ($named as $field => $map) {
                $point[$field] = (int) ($map[$key] ?? 0);
            }
            $points[] = $point;
        }

        return $points;
    }

    public function toArray(): array
    {
        return [
            'from' => $this->from->toIso8601String(),
            'to' => $this->to->toIso8601String(),
            'bucket' => $this->bucket,
        ];
    }

    // ---- internals ---------------------------------------------------------

    private static function autoBucket(CarbonImmutable $f, CarbonImmutable $t): string
    {
        $seconds = $t->getTimestamp() - $f->getTimestamp();
        $hours = $seconds / 3600;

        if ($hours <= 48) {
            return 'hour';
        }

        return ($seconds / 86400) <= 92 ? 'day' : 'week';
    }

    /** Coarsen the bucket until the point count fits under MAX_POINTS. */
    private static function fit(CarbonImmutable $f, CarbonImmutable $t, string $bucket): string
    {
        $seconds = $t->getTimestamp() - $f->getTimestamp();
        $divisor = ['hour' => 3600, 'day' => 86400, 'week' => 604800];
        $order = ['hour', 'day', 'week'];

        $i = array_search($bucket, $order, true);
        while ($i < count($order) - 1 && ($seconds / $divisor[$order[$i]]) + 1 > self::MAX_POINTS) {
            $i++;
        }

        return $order[$i];
    }

    private function floor(CarbonImmutable $t): CarbonImmutable
    {
        return match ($this->bucket) {
            'hour' => $t->startOfHour(),
            'day' => $t->startOfDay(),
            'week' => $t->startOfWeek(CarbonInterface::MONDAY),
        };
    }

    private function step(): DateInterval
    {
        return new DateInterval(match ($this->bucket) {
            'hour' => 'PT1H',
            'day' => 'P1D',
            'week' => 'P1W',
        });
    }

    private function keyFor(CarbonImmutable $t): string
    {
        return match ($this->bucket) {
            'hour' => $t->format('Y-m-d H:00:00'),
            'day', 'week' => $t->format('Y-m-d'),
        };
    }
}
