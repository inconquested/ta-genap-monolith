<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\User;
use App\Models\Vote;
use App\Services\PollService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PollDashboardApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private Poll $poll;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => UserRole::ADMIN->value]);
        $cat = PollCategory::create(['label' => 'CatA']);

        $this->poll = PollService::CreatePoll([
            'title' => 'Dashboard注目 poll',
            'description' => 'desc',
            'category' => $cat->id,
            'start_date' => '2026-09-20 09:00:00',
            'end_date' => '2026-09-27 09:00:00',
            'allow_comments' => false,
            'is_active' => true,
            'allow_quorum' => false,
            'quorum_count' => 0,
            'options' => [
                ['value' => 'Alpha', 'display_order' => 0],
                ['value' => 'Beta', 'display_order' => 1],
            ],
        ], $this->admin->id);

        $optA = $this->poll->options()->where('value', 'Alpha')->first();
        $optB = $this->poll->options()->where('value', 'Beta')->first();
        $voters = User::factory()->count(3)->create();

        // Hour 10: two votes for Alpha (two distinct voters); hour 12: one vote for Beta.
        // Hour 11 stays empty to prove gap-filling.
        Vote::create(['poll_id' => $this->poll->id, 'option_id' => $optA->id, 'user_id' => $voters[0]->id, 'voted_at' => '2026-09-20 10:15:00']);
        Vote::create(['poll_id' => $this->poll->id, 'option_id' => $optA->id, 'user_id' => $voters[1]->id, 'voted_at' => '2026-09-20 10:45:00']);
        Vote::create(['poll_id' => $this->poll->id, 'option_id' => $optB->id, 'user_id' => $voters[2]->id, 'voted_at' => '2026-09-20 12:05:00']);
    }

    public function test_options_endpoint_returns_standings_and_gapfilled_series(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')->getJson(
            "/api/analytics/polls/{$this->poll->id}/options?from=2026-09-20 09:00:00&to=2026-09-20 14:00:00&bucket=hour"
        );

        $response->assertOk()->assertJson(['success' => true]);
        $data = $response->json('data');

        $this->assertSame('hour', $data['window']['bucket']);
        $expectedTtl = $this->poll->fresh()->is_finalized ? 3600 : 30;
        $this->assertSame($expectedTtl, $data['refresh_after_seconds']);
        $this->assertSame(3, $data['total_votes']);
        $this->assertSame(3, $data['unique_voters']);

        $this->assertSame('Alpha', $data['standings'][0]['value']);
        $this->assertSame(2, $data['standings'][0]['votes']);
        $this->assertEqualsWithDelta(66.67, $data['standings'][0]['share'], 0.01);
        $this->assertEqualsWithDelta(33.33, $data['standings'][1]['share'], 0.01);

        // 09..14 hourly = 6 points; the empty 11:00 bucket is zero-filled.
        $alpha = collect($data['series'])->firstWhere('value', 'Alpha');
        $this->assertCount(6, $alpha['points']);
        $byBucket = collect($alpha['points'])->mapWithKeys(fn ($p) => [$p['bucket'] => $p['votes']]);
        $this->assertSame(2, $byBucket['2026-09-20 10:00:00']);
        $this->assertSame(0, $byBucket['2026-09-20 11:00:00']);

        $totals = collect($data['totals'])->mapWithKeys(fn ($p) => [$p['bucket'] => $p]);
        $this->assertSame(2, $totals['2026-09-20 10:00:00']['votes']);
        $this->assertSame(2, $totals['2026-09-20 10:00:00']['voters']);
        $this->assertSame(1, $totals['2026-09-20 12:00:00']['voters']);
    }

    public function test_show_endpoint_accepts_window_and_rejects_bad_bucket(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')->getJson(
            "/api/analytics/polls/{$this->poll->id}?from=2026-09-20 09:00:00&to=2026-09-20 14:00:00&bucket=hour"
        );

        $response->assertOk();
        $data = $response->json('data');
        $this->assertSame('hour', $data['window']['bucket']);
        $this->assertCount(6, $data['timeseries']['points']);
        $peak = collect($data['metrics'])->firstWhere('key', 'peak_voting_window');
        $this->assertSame('2026-09-20 10:00:00', $peak['value']);

        $this->actingAs($this->admin, 'sanctum')
            ->getJson("/api/analytics/polls/{$this->poll->id}?from=2026-09-20 09:00:00&to=2026-09-20 14:00:00&bucket=minute")
            ->assertStatus(422);
    }

    public function test_non_admin_is_forbidden(): void
    {
        $user = User::factory()->create(['role' => UserRole::USER->value]);

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/analytics/polls/{$this->poll->id}/options")
            ->assertForbidden();
    }

    public function test_poll_index_picker_filters(): void
    {
        $quiet = PollService::CreatePoll([
            'title' => 'Unrelated quiet poll',
            'description' => 'desc',
            'category' => PollCategory::first()->id,
            'start_date' => '2026-09-20 09:00:00',
            'end_date' => '2026-09-27 09:00:00',
            'allow_comments' => false,
            'is_active' => false,
            'allow_quorum' => false,
            'quorum_count' => 0,
            'options' => [['value' => 'Only', 'display_order' => 0]],
        ], $this->admin->id);

        // search narrows to the dashboard poll
        $search = $this->actingAs($this->admin, 'sanctum')->getJson('/api/polls?search=Dashboard注目&status=all');
        $search->assertOk();
        $this->assertSame(1, $search->json('data.total'));

        // default scope is active-only; status=all reveals the inactive one
        $this->assertSame(1, $this->getJson('/api/polls')->json('data.total'));
        $this->assertSame(2, $this->getJson('/api/polls?status=all')->json('data.total'));

        // most_voted puts the 3-vote poll first; per_page clamps pagination
        $sorted = $this->getJson('/api/polls?status=all&sort=most_voted');
        $this->assertSame((string) $this->poll->id, $sorted->json('data.data.0.id'));
        $this->assertSame((string) $quiet->id, $sorted->json('data.data.1.id'));
        $this->assertSame(1, $this->getJson('/api/polls?status=all&per_page=1')->json('data.per_page'));
    }
}
