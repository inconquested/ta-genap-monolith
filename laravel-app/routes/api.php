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
Route::middleware('api')->group(function () {
    Route::apiResource('polls/{poll}/votes', VoteController::class);
    Route::apiResource('/polls', PollController::class);
    Route::apiResource('/achievement-type', AchievementTypeController::class);
    Route::apiResource('/polls/{poll}/comments', Comment::class);
});
