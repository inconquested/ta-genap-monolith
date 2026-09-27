<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogTailApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private string $logPath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => UserRole::ADMIN->value]);
        $this->logPath = tempnam(sys_get_temp_dir(), 'logtail') ?: '';
        config(['logging.channels.single.path' => $this->logPath]);

        file_put_contents($this->logPath, implode("\n", [
            '[2026-09-27 10:00:01] production.INFO: boot ok',
            '[2026-09-27 10:00:02] production.WARNING: slow query {"ms":1200}',
            '[2026-09-27 10:00:03] production.ERROR: boom {"userId":"1","exception":"[object] (RuntimeException: boom at /app/a.php:1)',
            '[stacktrace]',
            '#0 /app/a.php(1): f()',
            '"}',
            '[2026-09-27 10:00:04] production.DEBUG: verbose detail',
            '',
        ]));
    }

    protected function tearDown(): void
    {
        if (is_file($this->logPath)) {
            unlink($this->logPath);
        }

        parent::tearDown();
    }

    public function test_tail_returns_last_entries_with_parsed_levels_and_multiline(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail?limit=2');

        $response->assertOk()->assertJson(['success' => true]);
        $data = $response->json('data');

        $this->assertSame('production', $data['entries'][0]['env'] ?? null);
        $this->assertSame(filesize($this->logPath), $data['cursor']);
        $this->assertFalse($data['rotated']);
        $this->assertFalse($data['truncated']);
        $this->assertCount(2, $data['entries']);

        // Multiline stack frames attach to the ERROR entry, context split off.
        $error = $data['entries'][0];
        $this->assertSame('error', $error['level']);
        $this->assertSame('boom', $error['message']);
        $this->assertStringContainsString('userId', $error['context'] ?? '');
        $this->assertStringStartsWith('2026-09-27T10:00:03', $error['timestamp']);
        $this->assertSame('debug', $data['entries'][1]['level']);
    }

    public function test_cursor_follow_up_returns_only_new_bytes(): void
    {
        $first = $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail?limit=100');
        $cursor = $first->json('data.cursor');

        file_put_contents($this->logPath, "[2026-09-27 10:00:05] production.INFO: later line\n", FILE_APPEND);

        $second = $this->actingAs($this->admin, 'sanctum')->getJson("/api/logs/tail?cursor={$cursor}");
        $second->assertOk();
        $this->assertCount(1, $second->json('data.entries'));
        $this->assertSame('later line', $second->json('data.entries.0.message'));
        $this->assertSame(filesize($this->logPath), $second->json('data.cursor'));

        // Nothing new → empty entries, same cursor.
        $third = $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail?cursor=' . $second->json('data.cursor'));
        $this->assertCount(0, $third->json('data.entries'));
    }

    public function test_levels_and_search_filter(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/logs/tail?limit=100&levels=error,warning&search=slow');

        $response->assertOk();
        $entries = $response->json('data.entries');
        $this->assertCount(1, $entries);
        $this->assertSame('warning', $entries[0]['level']);
    }

    public function test_rotation_restarts_tail_and_validation_rejects_bad_limit(): void
    {
        $size = filesize($this->logPath);

        $rotated = $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail?cursor=' . ($size + 999));
        $rotated->assertOk();
        $this->assertTrue($rotated->json('data.rotated'));
        $this->assertNotEmpty($rotated->json('data.entries'));

        $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail?limit=501')->assertStatus(422);
    }

    public function test_missing_file_returns_empty_and_non_admin_is_forbidden(): void
    {
        // Guest first: actingAs() persists for later calls in the same test.
        $this->getJson('/api/logs/tail')->assertUnauthorized();

        config(['logging.channels.single.path' => $this->logPath . '.nonexistent']);

        $response = $this->actingAs($this->admin, 'sanctum')->getJson('/api/logs/tail');
        $response->assertOk();
        $this->assertSame([], $response->json('data.entries'));
        $this->assertSame(0, $response->json('data.cursor'));

        $user = User::factory()->create(['role' => UserRole::USER->value]);
        $this->actingAs($user, 'sanctum')->getJson('/api/logs/tail')->assertForbidden();
    }
}
