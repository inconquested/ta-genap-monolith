<?php

namespace Tests\Feature;

use App\Events\AchievementUnlocked;
use App\Events\UserActed;
use App\Models\AchievementType;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\Vote;
use App\Notifications\AchievementNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * Verifies the achievement pipeline: UserActed -> CheckAndAward -> AchievementUnlocked
 * (ShouldBroadcastNow => Pusher) -> CreateUserAchievementRecord (DB record + database notification).
 */
class AchievementUnlockTest extends TestCase
{
    use RefreshDatabase;

    public function test_meeting_a_requirement_broadcasts_the_unlock_event(): void
    {
        Event::fake([AchievementUnlocked::class]); // partial fake: UserActed still reaches its real listener

        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user);

        Event::assertDispatched(
            AchievementUnlocked::class,
            fn (AchievementUnlocked $e) => $e->user->id === $user->id && $e->achievementType->id === $achievement->id
        );
    }

    public function test_unlock_persists_a_record_and_a_database_notification(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $this->pollFor($user);
        $achievement = $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user);

        $this->assertDatabaseHas('user_achievements', [
            'user_id' => $user->id,
            'achievement_type_id' => $achievement->id,
        ]);
        Notification::assertSentTo($user, AchievementNotification::class);
    }

    public function test_multiple_achievements_unlock_simultaneously(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $poll = $this->pollFor($user);      // satisfies poll_count >= 1
        $this->voteFor($user, $poll);       // satisfies vote_count >= 1

        $a1 = $this->achievement('poll_count', 1, 'first_poll');
        $a2 = $this->achievement('vote_count', 1, 'first_vote');

        UserActed::dispatch($user);

        $this->assertDatabaseHas('user_achievements', ['user_id' => $user->id, 'achievement_type_id' => $a1->id]);
        $this->assertDatabaseHas('user_achievements', ['user_id' => $user->id, 'achievement_type_id' => $a2->id]);
        $this->assertSame(2, UserAchievement::where('user_id', $user->id)->count());
        Notification::assertSentTimes(AchievementNotification::class, 2);
    }

    public function test_same_achievement_unlocks_independently_per_user(): void
    {
        Notification::fake();

        $achievement = $this->achievement('poll_count', 1, 'first_poll');
        $u1 = User::factory()->create();
        $u2 = User::factory()->create();
        $this->pollFor($u1);
        $this->pollFor($u2);

        UserActed::dispatch($u1);
        UserActed::dispatch($u2);

        $this->assertDatabaseHas('user_achievements', ['user_id' => $u1->id, 'achievement_type_id' => $achievement->id]);
        $this->assertDatabaseHas('user_achievements', ['user_id' => $u2->id, 'achievement_type_id' => $achievement->id]);
        Notification::assertSentTo($u1, AchievementNotification::class);
        Notification::assertSentTo($u2, AchievementNotification::class);
    }

    public function test_an_achievement_is_not_awarded_twice(): void
    {
        $user = User::factory()->create();
        $this->pollFor($user);
        $this->achievement('poll_count', 1, 'first_poll');

        UserActed::dispatch($user); // awards
        UserActed::dispatch($user); // already earned -> skipped

        $this->assertSame(1, UserAchievement::where('user_id', $user->id)->count());
    }

    // --- fixtures -----------------------------------------------------------

    private function achievement(string $type, int $value, string $code): AchievementType
    {
        return AchievementType::create([
            'id' => (string) Str::uuid(), // AchievementType has no HasUuids — set the PK explicitly
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

    private function voteFor(User $user, Poll $poll): Vote
    {
        $option = $poll->options()->create([
            'id' => (string) Str::uuid(),
            'value' => 'Option A',
            'display_order' => 0,
        ]);

        return Vote::create([
            'poll_id' => $poll->id,
            'option_id' => $option->id,
            'user_id' => $user->id,
            'voted_at' => now(),
        ]);
    }
}
