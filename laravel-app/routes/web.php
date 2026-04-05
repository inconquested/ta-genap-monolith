<?php

use App\Http\Controllers\PollController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'throttle:30,1'])->group(function () {
    Route::get(
        'dashboard',
        function () {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $userAchievements = App\Services\AchievementService::getUserAchievement($user);

            return Inertia::render('dashboard', [
                'userPolls' => App\Models\Poll::where('creator_id', $user->id)->with(['media'])->get(),
                'trendingPoll' => App\Services\PollService::getTrendingPoll(),
                'achievements' => [
                    'earned' => $userAchievements['earned'],
                    'types' => $userAchievements['types'],
                    '   progress' => $userAchievements['progress'],
                ],
            ]);
        }
    )->name('dashboard');
});

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::get('/polls/finalized/list', [PollController::class, 'finalizedList'])->name('polls.finalized.list');
    Route::resource('polls', PollController::class)->names([
        'index' => 'polls.index',
        'create' => 'polls.create',
        'store' => 'polls.store',
        'show' => 'polls.show',
        'edit' => 'polls.edit',
        'update' => 'polls.update',
        'destroy' => 'polls.destroy',
    ]);
    Route::get('/{user}/polls', [PollController::class, 'userPolls'])->name('polls.user');
});


require __DIR__ . '/settings.php';
