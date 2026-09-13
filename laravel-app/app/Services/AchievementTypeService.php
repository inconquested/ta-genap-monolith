<?php

namespace App\Services;

use App\Models\AchievementType;
use App\Notifications\AchievementRevokedNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AchievementTypeService
{
    public function create(array $data, ?\Illuminate\Http\UploadedFile $icon = null)
    {
        $achievementType = AchievementType::create(array_merge(
            ['id' => Str::uuid()],
            collect($data)->only(['code', 'label', 'description', 'requirement_type', 'requirement_value'])->all()
        ));
        if ($icon) {
            $achievementType->addMedia($icon)->toMediaCollection('achievement_icon');
        }
        return $achievementType->load('media');
    }

    public function search(string $search)
    {
        return AchievementType::where('code', 'like', "%{$search}%")
            ->orWhere('label', 'like', "%{$search}%")
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

    /**
     * Deleting a type cascades user_achievements rows away — notify holders
     * first so users learn their achievement was removed/replaced instead of
     * silently losing it. Notifications and delete commit atomically.
     */
    public function delete(AchievementType $achievementType)
    {
        $label = $achievementType->label;
        return DB::transaction(function () use ($achievementType, $label) {
            $achievementType->userAchievements()
                ->whereNull('revoked_at')
                ->with('user:id')
                ->get()
                ->each(function ($ua) use ($achievementType, $label) {
                    $ua->user->notify(new AchievementRevokedNotification(
                        $achievementType->id,
                        $label,
                        "Pencapaian \"{$label}\" telah dihapus atau digantikan dan dihapus dari profil Anda."
                    ));
                });

            return $achievementType->delete();
        });
    }
}
