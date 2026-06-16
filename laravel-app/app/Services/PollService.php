<?php

namespace App\Services;

use App\Models\Poll;
use App\Models\PollResult;
use App\Models\WinnerOption;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\PollCategory;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class PollService
{
    /**
     * Get paginated active polls with filters.
     */
    public static function getPaginatedPolls(array $filters = [], int $perPage = 5): LengthAwarePaginator
    {
        $query = Poll::where('is_active', true)
            ->with([
                'options:id,poll_id,value',
                'creator:id,username',
                'pollCategory:id,label',
                'votes',
                'media'
            ])
            ->withCount(['votes', 'comments'])
            ->orderBy('created_at', 'desc');

        if (!empty($filters['category'])) {
            $catParam = $filters['category'];
            $foundCat = PollCategory::where('id', $catParam)
                ->orWhere('label', $catParam)
                ->orWhereRaw('LOWER(label) = ?', [strtolower(str_replace('-', ' ', $catParam))])
                ->first();

            if ($foundCat) {
                $query->where('category', $foundCat->id);
            }
        }

        return $query->paginate($perPage);
    }

    /**
     * Get top creators based on poll count.
     */
    public static function getTopCreators(int $limit = 3)
    {
        return User::withCount('polls')
            ->orderBy('polls_count', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get recommended active polls.
     */
    public static function getRecommendedPolls(int $limit = 3, ?string $excludeId = null)
    {
        $query = Poll::where('is_active', true)
            ->with(['pollCategory', 'media']);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->inRandomOrder()
            ->limit($limit)
            ->get();
    }

    public static function CreatePoll(array $data, string $userId, ?UploadedFile $banner = null): Poll
    {
        try {
            $poll = DB::transaction(function () use ($data, $userId, $banner) {
                $poll = Poll::create([
                    'id' => Str::uuid(),
                    'creator_id' => $userId,
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'category' => $data['category'],
                    'start_date' => $data['start_date'],
                    'end_date' => $data['end_date'],
                    'allow_comments' => $data['allow_comments'],
                    'is_active' => $data['is_active'],
                    'allow_quorum' => $data['allow_quorum'],
                    'quorum_count' => $data['quorum_count']

                ]);
                if ($banner) {
                    $poll->addMedia($banner)->toMediaCollection('banner');
                }

                foreach ($data['options'] as $index => $option) {
                    $poll->options()->create([
                        'id' => Str::uuid(),
                        'value' => $option['value'],
                        'display_order' => $index
                    ]);
                }
                \App\Jobs\FinalizePolls::dispatch($poll)->delay($poll->end_date);
                return $poll;
            });

            // Dispatch a simple decoupled event so other domains can listen (e.g. achievements)
            if ($user = \App\Models\User::find($userId)) {
                \App\Events\UserActed::dispatch($user);
            }

            return $poll;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public static function UpdatePoll(array $data)
    {
        try {
            return DB::transaction(function () use ($data) {
                // 1. Update or Create Poll
                $poll = Poll::updateOrCreate(
                    ['id' => $data['poll_id'] ?? null],
                    [
                        'id' => $data['poll_id'] ?? (string) Str::uuid(),
                        'title' => $data['title'],
                        'description' => $data['description'],
                        'creator_id' => $data['creator_id'],
                        'start_date' => $data['start_date'],
                        'end_date' => $data['end_date'],
                        'is_active' => $data['is_active'],
                        'allow_quorum' => $data['allow_quorum'],
                        'allow_comments' => $data['allow_comments'],
                        'is_finalized' => $data['is_finalized']
                    ]
                );
                if ($poll->wasChanged('end_date')) {
                    \App\Jobs\FinalizePolls::dispatch($poll)->delay($poll->end_date)->afterCommit();
                }

                // 2. Map incoming options to extract IDs (only existing ones)
                $incomingOptionIds = collect($data['options'])
                    ->pluck('id')
                    ->filter()
                    ->toArray();

                // 3. Delete options that are no longer in the request
                if (!empty($incomingOptionIds)) {
                    $poll->options()->whereNotIn('id', $incomingOptionIds)->delete();
                } else {
                    // If no existing IDs, delete all old options
                    $poll->options()->delete();
                }

                // 4. Update or Create the options
                foreach ($data['options'] as $index => $optionData) {
                    // Check if ID exists, if not this is a new option
                    if (isset($optionData['id']) && !empty($optionData['id'])) {
                        // Update existing option
                        $poll->options()->updateOrCreate(
                            ['id' => $optionData['id']],
                            [
                                'value' => $optionData['value'],
                                'display_order' => $index
                            ]
                        );
                    } else {
                        // Create new option
                        $poll->options()->create([
                            'id' => (string) Str::uuid(),
                            'value' => $optionData['value'],
                            'display_order' => $index
                        ]);
                    }
                }

                // Return the poll with fresh options
                return $poll->fresh();
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public static function getTrendingPoll()
    {
        return Poll::where('created_at', '>=', now()->modify('-7 days'))
            ->withCount(['votes', 'comments'])
            ->having('votes_count', '>', 100)
            ->having('comments_count', '>', 10)
            ->get();
    }

    public static function finalizePoll(Poll $poll)
    {
        $options = $poll->options()
            ->withCount('votes')
            ->get();
        $maxVotes = $options->max('votes_count');
        $winners = $options->where('votes_count', $maxVotes);
        $totalVotes = $options->sum('votes_count');
        $isDraw = $winners->count() > 1;

        DB::transaction(function () use ($winners, $isDraw, $poll, $totalVotes) {
            $pollResult = PollResult::create([
                'id' => (string) Str::uuid(),
                'poll_id' => $poll->id,
                'is_draw' => $isDraw,
                'total_votes' => $totalVotes,
            ]);

            $poll->update(['is_finalized' => true]);
            
            foreach ($winners as $option) {
                WinnerOption::create([
                    'id' => Str::uuid(),
                    'poll_result_id' => $pollResult->id,
                    'option_id' => $option->id,
                ]);
            }

            // Notify poll creator
            if ($creator = $poll->creator) {
                $creator->notify(new \App\Notifications\PollNotification('poll_finalized', [
                    'message' => "Polling Anda \"{$poll->title}\" telah selesai. Lihat hasilnya!",
                    'poll_id' => $poll->id,
                    'action_url' => route('polls.show', $poll->id),
                    'icon' => 'Trophy'
                ]));
            }
        });
    }
}
