<?php

namespace App\Services;
use Illuminate\Support\Facades\Log;

use App\Events\AchievementUnlocked;
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
        Log::info("Checking achievements for user: " . $user->id);
        $availableAchivements = AchievementType::WhereNotIn('id', function ($query) use ($user) {
            $query->select('achievement_type_id')->from('user_achievements')->where('user_id', $user->id);
        })->get();
        /** @var AchievementType $a */
        foreach ($availableAchivements as $a) {
            Log::debug("Checking requirement for achievement: " . $a->name);
            if ($this->meetsRequirement($user, $a)) {
                Log::info("Requirement met for achievement: " . $a->name);
                $this->awardAchievement($user, $a);
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
            'vote_count' => $user->votes()->count() >= (int) $achievement->requirement_value,
            'poll_count' => $user->polls()->count() >= (int) $achievement->requirement_value,
            'streak_days' => $this->checkStreak($user, (int) $achievement->requirement_value),
            'popular_polls' => $this->hasPopularPoll($user, (int) $achievement->requirement_value),
            default => false
        };
    }

    /**
     * Dispatch achievement unlocked event
     */
    private function awardAchievement(User $user, AchievementType $achievement)
    {
        Log::debug("Attempting to award achievement: " . $achievement->name);
        
        try {
            $alreadyEarned = UserAchievement::where('user_id', $user->id)
                ->where('achievement_type_id', $achievement->id)
                ->exists();

            if (!$alreadyEarned) {
                Log::info("Awarding achievement: " . $achievement->name . " to user: " . $user->id);
                event(new AchievementUnlocked($user, $achievement));
            } else {
                Log::debug("Achievement already earned: " . $achievement->name);
            }
        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            Log::info("Handled race condition for achievement: " . $achievement->name);
        }
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
    private static function getCurrentValue(User $user, AchievementType $achievement)
    {
        return match ($achievement->requirement_type) {
            'vote_count' => $user->votes()->count(),
            'poll_count' => $user->polls()->count(),
            default => 0
        };
    }

    // Get user's progress toward next achievements
    public static function getProgress(User $user)
    {
        $unearnedAchievements = AchievementType::whereNotIn('id', function ($query) use ($user) {
            $query->select('achievement_type_id')
                ->from('user_achievements')
                ->where('user_id', $user->id);
        })->get();

        return $unearnedAchievements->map(function (AchievementType $achievement) use ($user) {
            $current = self::getCurrentValue($user, $achievement);
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
    public static function getUserAchievement(User $user, ?object $query = null)
    {
        $earned = UserAchievement::where('user_id', $user->id);
        $types = AchievementType::all();
        $progress = self::getProgress($user);
        if ($query && isset($query->type)) {
            $earned = $earned->where('achievement_type_id', $query->type);
        }
        return [
            'earned' => $earned->get(),
            'types' => $types,
            'progress' => $progress
        ];
    }
}
