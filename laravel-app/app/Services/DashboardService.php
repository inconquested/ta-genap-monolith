<?
namespace App\Services;
use App\Models\Poll;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;

class DashboardService
{
    public static function getAdminMetrics(?object $query = null)
    {
        $activeUsers = \Illuminate\Support\Facades\DB::table('sessions')
            ->whereNotNull('user_id')
            ->where('last_activity', '>=', Carbon::now()->subMinutes(15))
            ->count();
        $totalVotesTimeframe = Vote::select('id', 'user_id', 'poll_id', 'created_at')->where('created_at', '>=', Carbon::now()->subDays($query->timeFrame ?? 7))->count();
        $pollsCreatedTimeframe = Poll::select('id', 'title', 'created_at')->where('created_at', '>=', Carbon::now()->subDays($query->timeFrame ?? 7))->count();

        $type = $query->type ?? 'poll';
        switch ($type) {
            case 'poll':
                $tableData = Poll::select('id', 'title', 'created_at')->latest()->paginate(10);
                break;
            case 'vote':
                $tableData = Vote::select('id', 'user_id', 'poll_id', 'created_at')->latest()->paginate(10);
                break;
            default:
                $tableData = Poll::select('id', 'title', 'created_at')->latest()->paginate(10);
                break;
        }

        return [
            'users_active' => $activeUsers,
            'polls_created' => $pollsCreatedTimeframe,
            'total_votes' => $totalVotesTimeframe,
            'tableData' => collect($tableData->items())->map(fn($x) => [
        'id' => $x->id,
        'title' => $x->title ?? null,
        'created_at' => $x->created_at,
        ])
        ];
    }
}