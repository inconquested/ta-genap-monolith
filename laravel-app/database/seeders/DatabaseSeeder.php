<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Purges stale mock data and reseeds a fast, reporting-friendly dataset
     * (users, categories, polls, options, votes, comments, results, winners and
     * static banner media). See MockReportingSeeder for details.
     */
    public function run(): void
    {
        $this->call(MockReportingSeeder::class);
    }
}
