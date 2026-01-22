<?php

use App\Enums\VoteActions;
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
        Schema::create('vote_audit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();

            //What
            $table->string('action')->default(VoteActions::CREATED);
            $table->uuid('vote_id')->nullable()->index();
            //Who
            $table->uuid('performed_by_user_id')->nullable()->index();
            $table->string('performed_by_user_ip', 45)->nullable();
            //Platform Tracking
            $table->string('platform', 20)->nullable();
            $table->string('user_agent')->nullable();
            //additional info
            $table->json('old_values')->nullable(); // Previous state
            $table->json('new_values')->nullable(); // New state

            $table->uuid('poll_id')->nullable()->index();
            $table->uuid('option_id')->nullable()->index();

            $table->foreign('performed_by_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('vote_id')->references('id')->on('votes')->onDelete('set null');
            $table->foreign('poll_id')->references('id')->on('polls')->onDelete('set null');
            $table->foreign('option_id')->references('id')->on('poll_options')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vote_audit_logs');
    }
};
