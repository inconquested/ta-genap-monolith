<?php

namespace App\Services;

use App\Models\Poll;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PollService
{
    public static function CreatePoll(array $data, string $userId)
    {
        try {
            return DB::transaction(function () use ($data, $userId) {
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
                    'quorum' => $data['quorum'],
                    'quorum_count' => $data['quorum_count']

                ]);
                foreach ($data['options'] as $index => $option) {
                    $poll->options()->create([
                        'id' => Str::uuid(),
                        'value' => $option['value'],
                        'display_order' => $index
                    ]);
                }
                return $poll;
            });
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
                        'allow_comments' => $data['allow_comments'],
                        'is_finalized' => $data['is_finalized']
                    ]
                );

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
                                'option_text' => $optionData['option_text'],
                                'display_order' => $index
                            ]
                        );
                    } else {
                        // Create new option
                        $poll->options()->create([
                            'id' => (string) Str::uuid(),
                            'option_text' => $optionData['option_text'],
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

    public static function getTrendingPoll(){

    }
}
