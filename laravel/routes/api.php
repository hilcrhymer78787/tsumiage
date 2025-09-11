<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckToken;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\TaskReadController;
use App\Http\Controllers\WorkReadMonthController;
use App\Http\Controllers\InvitationReadController;

// テストルート
Route::get('/test', function () {
    return response()->json([
        'message' => 'this is test',
    ]);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// UserController のルート
Route::get('/user/test_auth', [UserController::class, 'test_auth']);
Route::post('/user/basic_auth', [UserController::class, 'basic_auth']);
Route::get('/user/bearer_auth', [UserController::class, 'bearer_auth']);
Route::post('/user/create', [UserController::class, 'create']);

Route::middleware([CheckToken::class])->group(function () {
    // TaskController のルート
    Route::get('/task/read', [TaskReadController::class, 'index']); //⭐️
    Route::post('/task/create', [TaskController::class, 'create']);
    Route::post('/task/sort', [TaskController::class, 'sort']);
    Route::delete('/task/delete', [TaskController::class, 'delete']);

    // UserController のルート（トークンチェック後）
    Route::delete('/user/delete', [UserController::class, 'delete']);

    // WorkController のルート
    Route::get('/work/read/month', [WorkReadMonthController::class, 'index']); //⭐️
    Route::post('/work/create', [WorkController::class, 'create']);
    Route::delete('/work/delete', [WorkController::class, 'delete']);
    Route::delete('/work/reset', [WorkController::class, 'reset']);

    // InvitationController のルート
    Route::get('/invitation/read', [InvitationReadController::class, 'index']); //⭐️
    Route::post('/invitation/create', [InvitationController::class, 'create']);
    Route::put('/invitation/update', [InvitationController::class, 'update']);
    Route::delete('/invitation/delete', [InvitationController::class, 'delete']);
});
