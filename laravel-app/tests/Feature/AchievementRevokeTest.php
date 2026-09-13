<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Events\UserActed;
use App\Models\AchievementType;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\User;
use App\Models\UserAchievement;
use App\Notifications\AchievementRevokedNotification;
use App\Services\AchievementService;
use App\Services\AchievementTypeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * Admin revocation + achievement-type deletion edge case:
 * revoked achievements stay hidden and are never re-awarded; deleting a type
 * notifies holders before the FK cascade removes their records.
 */
class AchievementRevokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_revoked_achievement_is_hidden_and_not_reawarded(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user); // awards
        $record = UserAchievement::where('user_id', $user->id)
            ->where('achievement_type_id', $achievement->id)
            ->first();
        $this->assertNotNull($record);

        app(AchievementService::class)->revoke($record, 'testing');

        $this->assertNotNull($record->fresh()->revoked_at);
        $this->assertSame(
            0,
            AchievementService::getUserAchievement($user)['earned']->count(),
            'revoked achievement must not show as earned'
        );

        UserActed::dispatch($user); // requirement still met, must NOT re-award

        $this->assertSame(1, UserAchievement::where('user_id', $user->id)->count());
        $this->assertSame(
            0,
            UserAchievement::where('user_id', $user->id)->whereNull('revoked_at')->count()
        );
        Notification::assertSentTo($user, AchievementRevokedNotification::class);
    }

    public function test_deleting_an_achievement_type_notifies_holders(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user); // awards
        $this->assertDatabaseHas('user_achievements', [
            'user_id' => $user->id,
            'achievement_type_id' => $achievement->id,
        ]);

        app(AchievementTypeService::class)->delete($achievement);

        $this->assertDatabaseMissing('user_achievements', [
            'user_id' => $user->id,
            'achievement_type_id' => $achievement->id,
        ]);
        Notification::assertSentTo($user, AchievementRevokedNotification::class);
    }

    public function test_revoke_route_is_admin_gated_and_revokes(): void
    {
        Notification::fake();

        $admin = User::factory()->create();
        $admin->forceFill(['role' => UserRole::ADMIN])->save();
        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user); // awards
        $record = UserAchievement::where('user_id', $user->id)
            ->where('achievement_type_id', $achievement->id)
            ->first();
        $this->assertNotNull($record);

        // unauthenticated -> 401
        $this->postJson("/api/user-achievements/{$record->id}/revoke")->assertUnauthorized();
        // validation: reason over 255 chars -> 422 (auth runs before validation, so test as admin)
        $this->actingAs($admin)
            ->postJson("/api/user-achievements/{$record->id}/revoke", ['reason' => str_repeat('x', 256)])
            ->assertStatus(422);
        // non-admin -> 403
        $this->actingAs($user)->postJson("/api/user-achievements/{$record->id}/revoke")->assertForbidden();
        // admin -> 200, envelope, row updated
        $this->actingAs($admin)
            ->postJson("/api/user-achievements/{$record->id}/revoke", ['reason' => 'cheating'])
            ->assertOk()->assertJsonPath('success', true);
        $this->assertNotNull($record->fresh()->revoked_at);
        $this->assertSame('cheating', $record->fresh()->revocation_reason);
    }

    public function test_restore_returns_revoked_achievement_and_reason_can_be_corrected(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');
        UserActed::dispatch($user);
        $record = UserAchievement::where('user_id', $user->id)
            ->where('achievement_type_id', $achievement->id)
            ->first();

        app(AchievementService::class)->revoke($record, 'first reason');
        app(AchievementService::class)->revoke($record, 'corrected reason');

        $this->assertSame('corrected reason', $record->fresh()->revocation_reason);
        Notification::assertSentTimes(AchievementRevokedNotification::class, 1);

        app(AchievementService::class)->restore($record);

        $this->assertNull($record->fresh()->revoked_at);
        $this->assertSame(
            1,
            AchievementService::getUserAchievement($user)['earned']->count(),
            'restored achievement must show as earned again'
        );
    }

    public function test_restore_route_is_admin_gated(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => UserRole::ADMIN])->save();
        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user); // awards
        $record = UserAchievement::where('user_id', $user->id)
            ->where('achievement_type_id', $achievement->id)
            ->first();
        app(AchievementService::class)->revoke($record, 'cheating');

        $this->postJson("/api/user-achievements/{$record->id}/restore")->assertUnauthorized();
        $this->actingAs($user)->postJson("/api/user-achievements/{$record->id}/restore")->assertForbidden();
        $this->actingAs($admin)
            ->postJson("/api/user-achievements/{$record->id}/restore")
            ->assertOk()->assertJsonPath('success', true);
        $this->assertNull($record->fresh()->revoked_at);
    }

    // --- fixtures (mirrors AchievementUnlockTest) ---------------------------

    private function achievement(string $type, int $value, string $code): AchievementType
    {
        return AchievementType::create([
            'id' => (string) Str::uuid(),
            'code' => $code,
            'label' => ucfirst(str_replace('_', ' ', $code)),
            'description' => 'test achievement',
            'requirement_type' => $type,
            'requirement_value' => $value,
        ]);
    }

    private function pollFor(User $user): Poll
    {
        $category = PollCategory::create(['label' => 'General']);

        return Poll::create([
            'id' => (string) Str::uuid(),
            'creator_id' => $user->id,
            'title' => 'Test poll',
            'category' => $category->id,
            'start_date' => now()->subDay(),
            'end_date' => now()->addDay(),
        ]);
    }
}
