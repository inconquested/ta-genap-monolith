<?php

use App\Http\Controllers\AchievementTypeController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserAchievementController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\PollCategoryController;
use App\Http\Controllers\CommentController;

Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/logout', [ApiAuthController::class, 'logout']);

//REST Endpoints

Route::get('/user/achievements', [UserAchievementController::class, 'index']);

// Admin metrics/health reports. Gated: getAdminMetrics() reads a client time_frame that drives an
// in-memory bucket loop, so this must not be publicly reachable.
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'metrics'])->name('api.dashboard.metrics');
    Route::get('/dashboard/health', [DashboardController::class, 'health'])->name('api.dashboard.health');

    // Report feature — admin-only desktop client. The reworked reports use a dynamic
    // [from, to] window (no presets). Literal segments MUST be declared before the
    // /{poll} wildcard, or it swallows them.
    Route::prefix('reports')->group(function () {
        Route::get('/health', [ReportController::class, 'health'])->name('api.reports.health');
        Route::get('/growth', [ReportController::class, 'growth'])->name('api.reports.growth');
        Route::get('/integrity', [ReportController::class, 'integrity'])->name('api.reports.integrity');
        Route::get('/{poll}', [ReportController::class, 'index'])->name('api.reports.poll');
    });

    // Admin revocation of a user's earned achievement.
    Route::post('/user-achievements/{userAchievement}/revoke', [UserAchievementController::class, 'revoke'])
        ->name('api.user-achievements.revoke');
    Route::post('/user-achievements/{userAchievement}/restore', [UserAchievementController::class, 'restore'])
        ->name('api.user-achievements.restore');
});

// Provider-facing per-poll analytics (admin only). End-user report above is untouched.
Route::middleware(['auth:sanctum', 'admin'])->prefix('analytics')->group(function () {
    Route::get('/polls/{poll}', [AnalyticsController::class, 'show'])->name('api.analytics.polls.show');
    Route::get('/polls/{poll}/comments', [AnalyticsController::class, 'comments'])->name('api.analytics.polls.comments');
});

Route::apiResource('/polls', PollController::class)->names([
    'index' => 'api.polls.index',
    'store' => 'api.polls.store',
    'show' => 'api.polls.show',
    'update' => 'api.polls.update',
    'destroy' => 'api.polls.destroy',
]);



Route::apiResource('/achievement-types', AchievementTypeController::class)->names([
    'index' => 'api.achievement-types.index',
    'store' => 'api.achievement-types.store',
    'show' => 'api.achievement-types.show',
    'update' => 'api.achievement-types.update',
    'destroy' => 'api.achievement-types.destroy',
]);

Route::apiResource('/poll-categories', PollCategoryController::class)->names([
    'index' => 'api.poll-categories.index',
    'store' => 'api.poll-categories.store',
    'show' => 'api.poll-categories.show',
    'update' => 'api.poll-categories.update',
    'destroy' => 'api.poll-categories.destroy',
]);

// Comment writes need an authenticated user ($req->user()); reads are gated too for consistency.
Route::middleware('auth:sanctum')->apiResource('/polls/{poll}/comments', CommentController::class)->names([
    'index' => 'api.comments.index',
    'store' => 'api.comments.store',
    'show' => 'api.comments.show',
    'update' => 'api.comments.update',
    'destroy' => 'api.comments.destroy',
]);
