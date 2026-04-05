<?php

namespace App\Services;

use App\Models\AchievementType;

class AchievementTypeService
{
    public function create(array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType = AchievementType::create($data);
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('icon');
        }
        return $achievementType->load('media');
    }

    public function search(string $search)
    {
        return AchievementType::where('code', 'like', "%{$search}%")
            ->orWhere('name', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->get()
            ->load('media');
    }

    public function update(AchievementType $achievementType, array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType->update($data);
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('icon');
        }
        return $achievementType;
    }

    public function delete(AchievementType $achievementType)
    {
        return $achievementType->delete();
    }
}
