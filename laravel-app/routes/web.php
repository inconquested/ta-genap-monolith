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

Route::middleware('auth')->group(function () {
    Route::resource('polls', PollController::class)->names([
        'index' => 'polls.index',
        'create' => 'polls.create',
        'store' => 'polls.store',
        'show' => 'polls.show',
        'edit' => 'polls.edit',
        'update' => 'polls.update',
        'destroy' => 'polls.destroy',]);
});

require __DIR__ . '/settings.php';
