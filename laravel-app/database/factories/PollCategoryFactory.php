<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PollCategory>
 */
class PollCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\PollCategory::class;
    public function definition(): array
    {
         $pollCategories = [
            'Politik', 'Sosial', 'Teknologi', 'Hiburan', 'Olahraga', 
            'Pendidikan', 'Gaya Hidup', 'Kesehatan', 'Kuliner', 'Ekonomi',
            'Opini Publik', 'Kebijakan', 'Lingkungan', 'Musik', 'Film',
            'Gadget', 'Otomotif', 'Wisata', 'Budaya', 'Religius'
        ];
        return [
            'id' => \Illuminate\Support\Str::uuid(),
            'label' => $this->faker->randomElement($pollCategories),
        ];
    }
}
