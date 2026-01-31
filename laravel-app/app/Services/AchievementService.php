<?php

namespace App\Services;

use App\Events\AchievementEarned;
use App\Models\AchievementType;
use App\Models\User;
use App\Models\UserAchievement;
use Carbon\Carbon;

class AchievementService
{
    /**
     * Check users' progress and
     * award them when criteria is met
     */
    public function CheckAndAward(User $user)
    {
        $newAchievement = [];
        $availableAchivements = AchievementType::WhereNotIn('id', function ($query) use ($user) {
            $query->select('achievement_type_id')->from('user_achievements')->where('user_id', $user->id);
        })->get();
        foreach ($availableAchivements as $a) {
            if ($this->meetsRequirement($user, $a)) {
                $newAchievement[] = $this->awardAchievement($user, $a);
            }
        }
    }

    /**
     * Determine whether user has
     * met the criteria to
     * be awarded
     */
    private function meetsRequirement(User $user, AchievementType $achievement)
    {
        return match ($achievement->requirement_type) {
            'vote_count' => $user->votes()->count() >= $achievement->requirement_value,
            'poll_count' => $user->polls()->count() >= $achievement->requirement_value,
            'streak_days' => $this->checkStreak($user, $achievement->requirement_value),
            'popular_polls' => $this->hasPopularPoll($user, $achievement->requirement_value),
            default => false
        };
    }

    /**
     * Add a record to 
     * UserAchievements
     */
    private function awardAchievement(User $user, AchievementType $achievement)
    {
        $userAchievement = UserAchievement::create([
            'user_id' => $user->id,
            'achievement_type_id' => $achievement->id,
            'progress_data' => [
                'current_value' => $this->getCurrentValue($user, $achievement),
            ]
        ]);

        // Trigger notification
        event(new AchievementEarned($user, $achievement));

        return $userAchievement->load('achievementType');
    }
    private function checkStreak($user, $days)
    {
        //get corresponding dates in N-days
        $voteDates = $user->votes()->selectRaw('DATE(voted_at) as vote_date')
            ->distinct()
            ->orderBy('vote_date', 'desc')
            ->limit($days)
            ->pluck('vote_date')
            ->toArray();

        /**
         * If the sum of all vote
         * occured within N-days
         * is less than N-days
         * return
         */
        if (count($voteDates) < $days) {
            return false;
        }
        for ($i = 0; $i < $days - 1; $i++) {
            $diff = Carbon::parse($voteDates[$i])->diffInDays($voteDates[$i + 1]);
            if ($diff !== 1) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check whether user has
     * votes with counts that
     * exceeded votes requirements
     */
    private function hasPopularPoll(User $user, int $minVotes)
    {
        return $user->polls()
            ->withCount('votes')
            ->having('votes_count', '>=', $minVotes)
            ->exists();
    }

    // Get user's curent actions count value
    private function getCurrentValue(User $user, AchievementType $achievement)
    {
        return match ($achievement->requirement_type) {
            'vote_count' => $user->votes()->count(),
            'poll_count' => $user->polls()->count(),
            default => 0
        };
    }

    // Get user's progress toward next achievements
    public function getProgress(User $user)
    {
        $unearnedAchievements = AchievementType::whereNotIn('id', function ($query) use ($user) {
            $query->select('achievement_type_id')
                ->from('user_achievements')
                ->where('user_id', $user->id);
        })->get();

        return $unearnedAchievements->map(function ($achievement) use ($user) {
            $current = $this->getCurrentValue($user, $achievement);
            $required = $achievement->requirement_value;

            return [
                'achievement' => $achievement,
                'current' => $current,
                'required' => $required,
                'percentage' => min(100, ($current / $required) * 100),
            ];
        });
    }

    //Get achievement user has
    public static function getUserAchievement(User $user) {
    return [
        'earned' => UserAchievement::where('user_id', $user->id)->get(),
        'types'  => AchievementType::all(),
    ];
}
}
