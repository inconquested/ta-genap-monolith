<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\VoteActions;
use App\Models\PollCategory;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteAuditLog;
use App\Services\PollService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActionAuditLogTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private string $categoryId;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create(['role' => UserRole::USER->value]);
        $this->categoryId = PollCategory::create(['label' => 'CatA'])->id;
    }

    private function makePoll(bool $comments = false, bool $active = true): \App\Models\Poll
    {
        return PollService::CreatePoll([
            'title' => 'Audited poll',
            'description' => 'desc',
            'category' => $this->categoryId,
            'start_date' => now()->subDay()->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(2)->format('Y-m-d H:i:s'),
            'allow_comments' => $comments,
            'is_active' => $active,
            'allow_quorum' => false,
            'quorum_count' => 0,
            'options' => [
                ['value' => 'A', 'display_order' => 0],
                ['value' => 'B', 'display_order' => 1],
            ],
        ], $this->user->id);
    }

    public function test_vote_cast_writes_audit_and_ignores_spoofed_user_id(): void
    {
        $poll = $this->makePoll();
        $other = User::factory()->create();
        $option = $poll->options()->where('value', 'A')->first();

        // A forged user_id must not reassign the vote.
        $response = $this->actingAs($this->user)->post(route('votes.store', $poll->id), [
            'option_id' => $option->id,
            'user_id' => $other->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('votes', ['poll_id' => $poll->id, 'user_id' => $this->user->id]);
        $this->assertDatabaseMissing('votes', ['poll_id' => $poll->id, 'user_id' => $other->id]);

        $log = VoteAuditLog::where('poll_id', $poll->id)->whereNotNull('vote_id')->first();
        $this->assertNotNull($log);
        $this->assertSame(VoteActions::CREATED->value, $log->action->value);
        $this->assertSame($this->user->id, $log->performed_by_user_id);
        $this->assertNotNull($log->performed_by_user_ip);
    }

    public function test_cross_poll_option_is_rejected_with_no_side_effects(): void
    {
        $poll = $this->makePoll();
        $alien = $this->makePoll();
        $alienOption = $alien->options()->first();

        $response = $this->actingAs($this->user)->post(route('votes.store', $poll->id), [
            'option_id' => $alienOption->id,
        ]);

        $response->assertRedirect();
        $this->assertSame(0, Vote::where('poll_id', $poll->id)->count());
        $this->assertSame(0, VoteAuditLog::whereNotNull('vote_id')->count());
    }

    public function test_poll_lifecycle_writes_audit_rows(): void
    {
        $poll = $this->makePoll();
        $this->assertDatabaseHas('vote_audit_logs', [
            'poll_id' => $poll->id, 'action' => VoteActions::CREATED->value,
            'performed_by_user_id' => $this->user->id,
        ]);

        $this->actingAs($this->user)->put(route('polls.update', $poll->id), [
            'title' => 'Audited poll v2',
            'description' => 'desc',
            'start_date' => now()->subDay()->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(3)->format('Y-m-d H:i:s'),
            'category' => $this->categoryId,
            'is_active' => true,
            'allow_comments' => false,
            'allow_quorum' => false,
            'quorum_count' => 0,
            'deleted_option_ids' => [],
            'options' => $poll->options->map(fn ($o) => [
                'id' => (string) $o->id, 'value' => $o->value, 'display_order' => $o->display_order,
            ])->all(),
        ])->assertRedirect();

        $update = VoteAuditLog::where('poll_id', $poll->id)
            ->where('action', VoteActions::UPDATED->value)->latest()->first();
        $this->assertNotNull($update);
        $this->assertSame('Audited poll', $update->old_values['title']);
        $this->assertSame('Audited poll v2', $update->new_values['title']);

        $pollId = (string) $poll->id;
        $this->actingAs($this->user)->delete(route('polls.destroy', $poll->id))->assertRedirect();

        // poll_id FK set-nulls on delete; the snapshot keeps the row meaningful.
        $deleted = VoteAuditLog::where('action', VoteActions::DELETED->value)->latest()->first();
        $this->assertNotNull($deleted);
        $this->assertNull($deleted->poll_id);
        $this->assertSame($pollId, $deleted->new_values['id']);
    }

    public function test_comment_lifecycle_writes_audit_rows(): void
    {
        $poll = $this->makePoll(comments: true);

        $created = $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/polls/{$poll->id}/comments", ['content' => 'first!']);
        $created->assertOk()->assertJson(['success' => true, 'status' => 201]);
        $commentId = $created->json('data.id');

        $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/polls/{$poll->id}/comments/{$commentId}", ['content' => 'edited!'])
            ->assertOk();
        $this->actingAs($this->user, 'sanctum')
            ->deleteJson("/api/polls/{$poll->id}/comments/{$commentId}")
            ->assertOk();

        $actions = VoteAuditLog::where('poll_id', $poll->id)->orderBy('created_at')->pluck('action')
            ->map(fn ($a) => $a instanceof VoteActions ? $a->value : $a)->all();
        $this->assertContains(VoteActions::CREATED->value, $actions);
        $this->assertContains(VoteActions::UPDATED->value, $actions);
        $this->assertContains(VoteActions::DELETED->value, $actions);

        // Non-vote rows never leak into vote-scoped metrics.
        $this->assertSame(0, VoteAuditLog::where('poll_id', $poll->id)->whereNotNull('vote_id')->count());
        $this->assertGreaterThan(0, VoteAuditLog::where('poll_id', $poll->id)->count());
    }
}
