<?php

namespace App\Services;

use App\Models\AchievementType;
use Str;

class AchievementTypeService
{
    public function create(array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType = AchievementType::create([
            'id' => Str::uuid(),
            'code' => $data['code'],
            'name' => $data['name'],
            'description' => $data['description'],
            'requirement_type' => $data['requirement_type'],
            'requirement_value' => $data['requirement_value'],
        ]);
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('achievement_icon');
        }
        return $achievementType->load('media');
    }

    public function search(string $search)
    {
        return AchievementType::where('code', 'like', "%{$search}%")
            ->orWhere('name', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->get();
    }

    public function update(AchievementType $achievementType, array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType->update($data);
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('achievement_icon');
        }
        return $achievementType;
    }

    public function delete(AchievementType $achievementType)
    {
        return $achievementType->delete();
    }
}
