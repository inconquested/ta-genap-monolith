<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Existing DBs created notifications.notifiable_id as bigint (morphs). Notifiables (User) use uuid
 * PKs, so every database notification truncated its id and failed to insert. Widen to char(36).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->char('notifiable_id', 36)->change();
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->unsignedBigInteger('notifiable_id')->change();
        });
    }
};
