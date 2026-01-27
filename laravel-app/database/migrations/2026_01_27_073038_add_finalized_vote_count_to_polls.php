<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('polls', function (Blueprint $table) {
           /**
            * Determine if poll has maximal
            * thresholds of vote counts
            */
            $table->boolean('is_finalized_vote_counts')->after('description')->default(false);
            $table->unsignedBigInteger('finalized_vote_counts')->after('is_finalized_vote_counts')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('polls', function (Blueprint $table) {
            $table->dropColumn('is_finalized_vote_counts');
            $table->dropColumn('finalized_vote_counts');
        });
    }
};
