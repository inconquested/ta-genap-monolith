<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Revocation keeps the row (so the unique constraint blocks re-awarding);
     * revoked_at NULL = active achievement.
     */
    public function up(): void
    {
        Schema::table('user_achievements', function (Blueprint $table) {
            $table->timestamp('revoked_at')->nullable()->after('earned_at');
            $table->string('revocation_reason')->nullable()->after('revoked_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_achievements', function (Blueprint $table) {
            $table->dropColumn(['revoked_at', 'revocation_reason']);
        });
    }
};
