<?php

use App\Http\Controllers\AchievementTypeController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\UserAchievementController;
use App\Http\Controllers\VoteController;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//REST Endpoints
Route::middleware('auth')->group(function () {
    Route::apiResource('/polls', PollController::class)->names([
        'index' => 'api.polls.index',
        'store' => 'api.polls.store',
        'show' => 'api.polls.show',
        'update' => 'api.polls.update',
        'destroy' => 'api.polls.destroy',
    ]);
    Route::apiResource('polls/{poll}/votes', VoteController::class);
    Route::apiResource('/achievement-type', AchievementTypeController::class);
    Route::apiResource('/polls/{poll}/comments', Comment::class);
});
