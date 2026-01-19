<?php

namespace App\Jobs;

use App\Models\Poll;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FinalizePolls implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $polls = Poll::cursor()
            ->where('end_date', '<=', now())
            ->where('is_finalized', false)
            ->with('options')
            ->get();

        foreach ($polls as $poll) {
            DB::transaction(function () use ($poll) {
                //Get options with vote counts
                //Find highest vote
                //Get option reaching max number
                //Create Summary
                //
            });
        }
    }
}
