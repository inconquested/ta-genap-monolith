<?php

namespace Tests\Unit;

use App\Services\PollAnalyticsService;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class PollAnalyticsServiceTest extends TestCase
{
    public function test_minutes_is_version_proof_and_non_negative()
    {
        // equal instants → 0
        $this->assertSame(0, PollAnalyticsService::minutes('2026-07-16 10:00:00', '2026-07-16 10:00:00'));
        // 90 minutes apart from raw strings (voted_at is not cast to Carbon)
        $this->assertSame(90, PollAnalyticsService::minutes('2026-07-16 10:00:00', '2026-07-16 11:30:00'));
        // mixed Carbon + string, reversed order → absolute value
        $this->assertSame(90, PollAnalyticsService::minutes(Carbon::parse('2026-07-16 11:30:00'), '2026-07-16 10:00:00'));
        // null guard → 0 (poll with no start/end or unreached metric)
        $this->assertSame(0, PollAnalyticsService::minutes(null, '2026-07-16 10:00:00'));
    }
}
