<?php

namespace App\Services;

use App\Models\Poll;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PollService
{
    public static function CreatePoll(array $data)
    {
        $poll = Poll::create([
            'id' => Str::uuid(),
            'creator_id' => $data['creator_id'],
            'title' => $data['title'],
            'description' => $data['description'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
        ]);

        foreach ($data['options'] as $index => $option) {
            $poll->options()->create([
                'id' => Str::uuid(),
                'option_text' => $option['option_text'],
                'display_order' => $index
            ]);
        }
        return $poll;
    }

    public static function UpdatePoll(array $data)
    {
        $poll = Poll::updateOrCreate([
            'id' => $data['poll_id'],
        ], [
            'title' => $data['title'],
            'description' => $data['description'],
            'creator_id' => $data['creator_id'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date']
        ]);

        foreach ($data['options'] as $index => $option) {
            $poll->options()->updateOrCreate([
                'option_text' => $option['option_text'],
                'display_order' => $index
            ]);
        }
        return $poll;
    }
}
