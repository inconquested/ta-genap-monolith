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
    public function __construct(public Poll $poll)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $poll = $this->poll->fresh(); // always refresh from DB
        // Guard: if poll was extended, stop here
        if ($poll->end_date->isFuture() || $poll->is_finalized) 
            return;
        \App\Services\PollService::finalizePoll($this->poll);
    }
}
