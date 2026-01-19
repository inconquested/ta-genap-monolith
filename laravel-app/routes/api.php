<?php

use App\Http\Controllers\PollController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//REST Endpoints
Route::middleware('api')->group(function () {
    Route::apiResource('/polls', PollController::class);
});
