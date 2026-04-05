<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        \App\Models\PollCategory::factory(10)->create();

        User::create([
            'username' => 'admin',
            'full_name' => 'Admin',
            'email' => 'admin123@mail.com',
            'password' => 'password123',
            'role' => UserRole::ADMIN,
        ]);
    }
}
