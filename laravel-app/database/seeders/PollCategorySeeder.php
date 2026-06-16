<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class PollCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'IT',
            'description' => 'Teknologi Informasi'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Keuangan',
            'description' => 'Keuangan'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Bisnis',
            'description' => 'Bisnis'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Gaming',
            'description' => 'Gaming'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Hiburan',
            'description' => 'Hiburan'
        ]);
    }
}
