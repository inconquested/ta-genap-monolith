<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Dashboard/analytics hot paths filter, sort, and group by these columns, but they were unindexed
 * (only votes.created_at/voted_at were covered). Without these, every /api/dashboard hit full-scans
 * polls and filesorts — the main driver of P90 latency. Mirrors add_created_index_votes for polls/comments.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('polls', function (Blueprint $table) {
            $table->index('created_at');                 // range count + chart bucketing + latest() page
            $table->index(['is_finalized', 'end_date']); // getPlatformHealth pending-finalization scan
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->index(['poll_id', 'created_at']);    // poll-scoped latest() + comment-analytics buckets
        });
    }

    public function down(): void
    {
        Schema::table('polls', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['is_finalized', 'end_date']);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropIndex(['poll_id', 'created_at']);
        });
    }
};
