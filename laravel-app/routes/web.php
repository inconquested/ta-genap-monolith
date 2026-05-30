<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Broadcast::routes(['middleware' => ['auth']]);


Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('welcome');
})->name('home');

Route::get('/auth/{provider}/redirect', function ($provider) {
    return Socialite::driver($provider)->redirect();
})->name('auth.redirect');

Route::get('/auth/{provider}/callback', function ($provider) {
    try {
        $socialUser = Socialite::driver($provider)->user();
    } catch (\Exception $e) {
        return redirect()->route('login')->with('error', 'Authentication failed.');
    }

    $user = User::where('email', $socialUser->getEmail())->first();

    if ($user) {
        $user->update([
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
        ]);
    } else {
        $user = User::create([
            'username' => $socialUser->getNickname() ?? explode('@', $socialUser->getEmail())[0],
            'full_name' => $socialUser->getName(),
            'email' => $socialUser->getEmail(),
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
            'password' => null, // Password can be null for social users
        ]);
    }

    Auth::login($user);

    return redirect()->intended(route('dashboard'));
});

Route::middleware(['auth', 'verified', 'throttle:30,1'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/leaderboard', [\App\Http\Controllers\LeaderboardController::class, 'index'])->name('leaderboard.index');
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


Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::resource('comments', CommentController::class)->names([
        'index' => 'comments.index',
        'create' => 'comments.create',
        'store' => 'comments.store',
        'show' => 'comments.show',
        'edit' => 'comments.edit',
        'update' => 'comments.update',
        'destroy' => 'comments.destroy',
    ]);
});

Route::middleware(['auth', 'throttle:60,1'])->group(function () {
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
    Route::delete('/notifications/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy'])->name('notifications.destroy');
});


require __DIR__ . '/settings.php';
