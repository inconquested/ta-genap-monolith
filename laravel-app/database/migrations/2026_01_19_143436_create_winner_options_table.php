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
        Schema::create('winner_options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('poll_result_id')->constrained('poll_results');
            $table->foreignUuid('option_id')->constrained('poll_options');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('winner_options');
    }
};
