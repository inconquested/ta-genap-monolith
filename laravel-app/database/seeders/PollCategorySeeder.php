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
            'label' => 'IT'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Keuangan'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Bisnis'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Gaming'
        ]);
        \App\Models\PollCategory::create([
            'id' => Str::uuid(),
            'label' => 'Hiburan'
        ]);
    }
}
