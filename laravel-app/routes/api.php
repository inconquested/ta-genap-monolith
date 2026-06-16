<?php

use App\Http\Controllers\AchievementTypeController;
use App\Http\Controllers\Controller;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->name('api.dashboard.index');

Route::get('/reports/{poll}', [ReportController::class, 'index']);

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

Route::apiResource('/polls/{poll}/comments', CommentController::class)->names([
    'index' => 'api.comments.index',
    'store' => 'api.comments.store',
    'show' => 'api.comments.show',
    'update' => 'api.comments.update',
    'destroy' => 'api.comments.destroy',
]);
