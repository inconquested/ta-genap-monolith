<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PollController;

use App\Http\Controllers\VoteController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
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

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::get('/polls/{poll}/votes', [VoteController::class, 'index'])->name('votes.index');
    Route::post('/polls/{poll}/votes', [VoteController::class, 'store'])->name('votes.store');
    Route::get('/user/votes', [VoteController::class, 'showUserVotes'])->name('votes.user');
    Route::get('/polls/{poll}/results', [VoteController::class, 'getPollResults'])->name('votes.results');
});


require __DIR__ . '/settings.php';
