<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * CRUD for the poll-scoped comment API (routes/api.php -> /api/polls/{poll}/comments).
 */
class CommentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_post_a_comment(): void
    {
        $user = User::factory()->create();
        $poll = $this->poll();

        $this->actingAs($user, 'sanctum')
            ->postJson("/api/polls/{$poll->id}/comments", ['content' => 'Great poll!'])
            ->assertOk()
            ->assertJsonPath('data.content', 'Great poll!');

        $this->assertDatabaseHas('comments', [
            'poll_id' => $poll->id,
            'user_id' => $user->id,
            'content' => 'Great poll!',
        ]);
    }

    public function test_content_is_required(): void
    {
        $user = User::factory()->create();
        $poll = $this->poll();

        $this->actingAs($user, 'sanctum')
            ->postJson("/api/polls/{$poll->id}/comments", ['content' => ''])
            ->assertStatus(422);
    }

    public function test_commenting_is_rejected_when_disabled(): void
    {
        $user = User::factory()->create();
        $poll = $this->poll(allowComments: false);

        $this->actingAs($user, 'sanctum')
            ->postJson("/api/polls/{$poll->id}/comments", ['content' => 'Hi'])
            // App convention: HTTP 200 with the real code in the body `status` field.
            ->assertOk()
            ->assertJsonPath('status', 403);

        $this->assertDatabaseCount('comments', 0);
    }

    public function test_guests_cannot_comment(): void
    {
        $poll = $this->poll();

        $this->postJson("/api/polls/{$poll->id}/comments", ['content' => 'Hi'])
            ->assertUnauthorized();
    }

    public function test_author_can_update_their_comment_but_others_cannot(): void
    {
        $author = User::factory()->create();
        $stranger = User::factory()->create();
        $poll = $this->poll();
        $comment = $this->comment($poll, $author);

        $this->actingAs($stranger, 'sanctum')
            ->putJson("/api/polls/{$poll->id}/comments/{$comment->id}", ['content' => 'hijacked'])
            ->assertOk()
            ->assertJsonPath('status', 403);

        $this->actingAs($author, 'sanctum')
            ->putJson("/api/polls/{$poll->id}/comments/{$comment->id}", ['content' => 'edited'])
            ->assertOk();

        $this->assertDatabaseHas('comments', ['id' => $comment->id, 'content' => 'edited']);
    }

    public function test_author_can_delete_their_comment_but_others_cannot(): void
    {
        $author = User::factory()->create();
        $stranger = User::factory()->create();
        $poll = $this->poll();
        $comment = $this->comment($poll, $author);

        $this->actingAs($stranger, 'sanctum')
            ->deleteJson("/api/polls/{$poll->id}/comments/{$comment->id}")
            ->assertOk()
            ->assertJsonPath('status', 403);
        $this->assertDatabaseHas('comments', ['id' => $comment->id]);

        $this->actingAs($author, 'sanctum')
            ->deleteJson("/api/polls/{$poll->id}/comments/{$comment->id}")
            ->assertOk();
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    public function test_index_lists_a_polls_comments(): void
    {
        $user = User::factory()->create();
        $poll = $this->poll();
        $this->comment($poll, $user, 'first');
        $this->comment($poll, $user, 'second');

        $this->actingAs($user, 'sanctum')
            ->getJson("/api/polls/{$poll->id}/comments")
            ->assertOk()
            ->assertJsonPath('data.total', 2);
    }

    // --- fixtures ------------------  -----------------------------------------

    private function poll(bool $allowComments = true): Poll
    {
        return Poll::create([
            'id' => (string) Str::uuid(),
            'creator_id' => User::factory()->create()->id,
            'title' => 'Test poll',
            'category' => PollCategory::create(['label' => 'General'])->id,
            'start_date' => now()->subDay(),
            'end_date' => now()->addDay(),
            'allow_comments' => $allowComments,
        ]);
    }

    private function comment(Poll $poll, User $user, string $content = 'hello'): Comment
    {
        return $poll->comments()->create(['user_id' => $user->id, 'content' => $content]);
    }
}
