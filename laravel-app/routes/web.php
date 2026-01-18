<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware('throttle:10,1')->group(function () {
    Route::apiResource('polls', PollController::class);
    Route::post('/votes', [VoteController::class, 'store']);
    Route::get('/polls/{poll}/results', [VoteController::class]);
    Route::get('/my-votes', [VoteController::class, 'showUserVotes']);
});

require __DIR__ . '/settings.php';
