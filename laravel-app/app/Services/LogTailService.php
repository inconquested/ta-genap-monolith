<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use Illuminate\Http\Request;

/**
 * Cursor-based tail of the application log for the desktop client.
 *
 * Polling protocol: first call omits `cursor` and gets the last `limit`
 * entries plus `cursor` = filesize; every follow-up passes that cursor back
 * and gets only new bytes. Works like `tail -F`: a cursor past EOF means the
 * file was rotated/truncated, so the tail restarts and `rotated: true`.
 *
 * Performance budget (per request, regardless of file size — laravel.log is
 * a single unbounded file): at most 512KB scanned backwards for the initial
 * tail, at most 256KB read forwards per poll, 500 entries max, 4KB per entry.
 * Multiline stack frames attach to their entry; stray lines are dropped.
 */
final class LogTailService
{
    private const MAX_LINES = 500;

    private const MAX_BYTES_PER_READ = 262144;

    private const TAIL_SCAN_BUDGET = 524288;

    private const CHUNK = 8192;

    private const MAX_ENTRY_CHARS = 4096;

    private const LEVELS = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'];

    public static function tail(Request $req): array
    {
        $validated = $req->validate([
            'cursor' => ['nullable', 'integer', 'min:0'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:' . self::MAX_LINES],
            'levels' => ['nullable', 'string', 'max:200'],
            'search' => ['nullable', 'string', 'max:200'],
        ]);

        $limit = $validated['limit'] ?? 100;
        $levels = self::parseLevels($validated['levels'] ?? null);
        $search = $validated['search'] ?? null;

        // Config-driven (not hardcoded) so tests can point at a fixture file.
        $path = (string) config('logging.channels.single.path', storage_path('logs/laravel.log'));
        if (! is_file($path)) {
            return self::shape($path, 0, 0, false, false, []);
        }

        $size = filesize($path);
        $cursor = $validated['cursor'] ?? null;

        if ($cursor === null || $cursor > $size) {
            $entries = self::filtered(self::readTail($path, $size, $limit), $levels, $search, $limit);

            return self::shape($path, $size, $size, $cursor !== null, false, $entries);
        }

        [$entries, $nextCursor, $truncated] = self::readForward($path, $size, $cursor);
        $entries = self::filtered($entries, $levels, $search, $limit);

        return self::shape($path, $size, $nextCursor, false, $truncated, $entries);
    }

    /** Comma-separated level names → known levels only; unknown tokens ignored, never 422. */
    private static function parseLevels(?string $raw): array
    {
        if ($raw === null || $raw === '') {
            return [];
        }

        return array_values(array_intersect(
            array_map(fn ($l) => strtolower(trim($l)), explode(',', $raw)),
            self::LEVELS,
        ));
    }

    /**
     * Last ~`limit` entries via a backwards bounded scan. Line count overshoots
     * by 5x because one entry can span many lines (stack traces); the scan
     * budget still caps the read, and entries are sliced after parsing.
     */
    private static function readTail(string $path, int $size, int $limit): array
    {
        $handle = fopen($path, 'rb');
        $pos = $size;
        $buffer = '';
        $scanned = 0;
        $wantLines = $limit * 5 + 5;

        while ($pos > 0 && $scanned < self::TAIL_SCAN_BUDGET) {
            $read = min(self::CHUNK, $pos, self::TAIL_SCAN_BUDGET - $scanned);
            $pos -= $read;
            $scanned += $read;
            fseek($handle, $pos);
            $buffer = fread($handle, $read) . $buffer;
            if (substr_count($buffer, "\n") >= $wantLines) {
                break;
            }
        }
        fclose($handle);

        // Drop the leading partial line unless we reached the start of file.
        if ($pos > 0 && ($cut = strpos($buffer, "\n")) !== false) {
            $buffer = substr($buffer, $cut + 1);
        }

        return self::parse(preg_split('/\r?\n/', rtrim($buffer, "\r\n")) ?: []);
    }

    /**
     * Bytes [cursor, size), capped. The trailing partial line is left for the
     * next poll so entries never arrive split; `truncated` tells the client to
     * poll again immediately instead of waiting out its interval.
     *
     * @return array{0: array, 1: int, 2: bool}
     */
    private static function readForward(string $path, int $size, int $cursor): array
    {
        $handle = fopen($path, 'rb');
        fseek($handle, $cursor);
        $data = stream_get_contents($handle, min($size - $cursor, self::MAX_BYTES_PER_READ));
        fclose($handle);
        $data = $data === false ? '' : $data;

        $consumed = strlen($data);
        $truncated = $cursor + $consumed < $size;
        if ($truncated && ($cut = strrpos($data, "\n")) !== false) {
            $data = substr($data, 0, $cut + 1);
            $consumed = strlen($data);
        }

        $lines = $data === '' ? [] : (preg_split('/\r?\n/', rtrim($data, "\r\n")) ?: []);

        return [self::parse($lines), $cursor + $consumed, $truncated];
    }

    /** Raw lines → entries; continuation lines (stack frames) attach to the open entry. */
    private static function parse(array $lines): array
    {
        $entries = [];
        $current = null;

        foreach ($lines as $line) {
            if (preg_match('/^\[(?P<ts>[^\]]+)\]\s+(?P<env>[^.]+)\.(?P<level>[A-Za-z]+):\s?(?P<msg>.*)$/', $line, $m)) {
                if ($current !== null) {
                    $entries[] = self::finalize($current);
                }
                $current = ['ts' => $m['ts'], 'env' => $m['env'], 'level' => strtolower($m['level']), 'lines' => [$m['msg']]];
            } elseif ($current !== null) {
                $current['lines'][] = $line;
            }
        }
        if ($current !== null) {
            $entries[] = self::finalize($current);
        }

        return $entries;
    }

    private static function finalize(array $entry): array
    {
        // Real logs break context JSON across lines (stack traces), so only the
        // first line is split: `message {"json…` → message + context remainder.
        // Split heuristically on ` {"` — a bare ` {` may be message prose.
        $first = array_shift($entry['lines']);
        $message = $first;
        $rest = [];
        if (preg_match('/^(?P<msg>.*?) (?P<ctx>\{".*)$/s', $first, $m)) {
            $message = $m['msg'];
            $rest[] = $m['ctx'];
        }
        $rest = array_merge($rest, $entry['lines']);

        $context = $rest !== [] ? implode("\n", $rest) : null;
        if ($context !== null && mb_strlen($context) > self::MAX_ENTRY_CHARS) {
            $context = mb_substr($context, 0, self::MAX_ENTRY_CHARS) . '… [truncated]';
        }
        if (mb_strlen($message) > self::MAX_ENTRY_CHARS) {
            $message = mb_substr($message, 0, self::MAX_ENTRY_CHARS) . '… [truncated]';
        }

        try {
            $timestamp = CarbonImmutable::parse($entry['ts'])->toIso8601String();
        } catch (\Throwable) {
            $timestamp = null;
        }

        return [
            'timestamp' => $timestamp,
            'env' => $entry['env'],
            'level' => $entry['level'],
            'message' => $message,
            'context' => $context,
        ];
    }

    /** Filters apply inside the bounded read window, then the newest `limit` win. */
    private static function filtered(array $entries, array $levels, ?string $search, int $limit): array
    {
        $entries = array_values(array_filter($entries, fn ($e) =>
            ($levels === [] || in_array($e['level'], $levels, true))
            && ($search === null || stripos($e['message'] . "\n" . ($e['context'] ?? ''), $search) !== false)
        ));

        return array_slice($entries, -$limit);
    }

    private static function shape(string $path, int $size, int $cursor, bool $rotated, bool $truncated, array $entries): array
    {
        return [
            'file' => basename($path),
            'size' => $size,
            'cursor' => $cursor,
            'rotated' => $rotated,
            'truncated' => $truncated,
            'entries' => $entries,
        ];
    }
}
