<?php

namespace App\Services;

use App\Models\AchievementType;

class AchievementTypeService
{
    public function getAll()
    {
        return AchievementType::all();
    }

    public function getById(AchievementType $achievementType)
    {
        return $achievementType;
    }

    public function create(array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType = AchievementType::create($data);
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('icon');
        }
        return $achievementType;
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
