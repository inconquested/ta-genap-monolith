<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class LeaderboardService
{
    /**
     * Get the global leaderboard sorted by the most achievements earned.
     */
    public static function getGlobalLeaderboard(User $currentUser)
    {
        // Get all users with their achievement count, vote count, etc.
        $users = User::select('users.id', 'users.username', 'users.full_name')
            ->selectRaw('(SELECT COUNT(*) FROM user_achievements WHERE user_achievements.user_id = users.id) as badges')
            ->selectRaw('(SELECT COUNT(*) FROM votes WHERE votes.user_id = users.id) as votes')
            // For now, win rate is hardcoded as an example, since calculating exact historical win rate requires complex logic
            ->selectRaw('0 as win_rate_percentage')
            ->orderBy('badges', 'desc')
            ->orderBy('votes', 'desc')
            ->get();

        $leaderboard = [];
        $activeUserRow = null;

        foreach ($users as $index => $user) {
            $rank = $index + 1;

            // Assign some fun tags based on rank or badges
            $tag = null;
            if ($rank === 1)
                $tag = 'Grandmaster';
            elseif ($rank <= 3)
                $tag = 'Veteran';
            elseif ($rank <= 10)
                $tag = 'Analyst';

            $rowData = [
                'id' => $user->id,
                'rank' => $rank,
                'user' => [
                    'username' => $user->username,
                    'tag' => $user->id === $currentUser->id ? '(You)' : $tag,

                ],
                'votes' => number_format((float) $user->votes),
                'win_rate' => $user->win_rate_percentage . '%',
                'badges' => (int) $user->badges,
                'isActiveUser' => $user->id === $currentUser->id,
            ];

            if ($user->id === $currentUser->id) {
                $activeUserRow = $rowData;
            }

            // We maybe only want the top 100 for the main list
            if ($index < 100) {
                $leaderboard[] = $rowData;
            }
        }

        // Make sure the active user is in the list, if not add them to the end (or as a separate object, but array is fine)
        if ($activeUserRow && !in_array($activeUserRow, $leaderboard)) {
            $leaderboard[] = $activeUserRow;
        }

        return $leaderboard;
    }
}
