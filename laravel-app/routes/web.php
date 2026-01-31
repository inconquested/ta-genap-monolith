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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard',[
            'userPolls' => App\Models\Poll::where('creator_id', Auth::user('id'))->get(),
            'trendingPoll' => App\Services\PollService::getTrendingPoll(),
            'achievements' => App\Services\AchievementService::getUserAchievement(Auth::user('id')),
        ]);
    })->name('dashboard');
});

    Route::get('/polls', [PollController::class, 'indexInertia'])->name('web.polls.indexInertia');
    Route::get('/polls/create', [PollController::class, 'create'])->name('web.polls.create');
    Route::get('/polls/{poll}/edit', [PollController::class, 'edit'])->name('web.polls.edit');

require __DIR__ . '/settings.php';
