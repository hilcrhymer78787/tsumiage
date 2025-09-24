<?php
// TODO: ✅ APIのリファクタリング
// TODO: ⭕️ フロントのハンドリングテスト

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckToken;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\TaskReadController;
use App\Http\Controllers\TaskCreateController;
use App\Http\Controllers\TaskSortController;
use App\Http\Controllers\TaskDeleteController;
use App\Http\Controllers\AuthTestController;
use App\Http\Controllers\AuthBearerController;
use App\Http\Controllers\AuthBasicController;
use App\Http\Controllers\UserCreateController;
use App\Http\Controllers\UserDeleteController;
use App\Http\Controllers\WorkReadMonthController;
use App\Http\Controllers\WorkCreateController;
use App\Http\Controllers\WorkDeleteController;
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

Route::get('/user/auth/test', [AuthTestController::class, 'index']); //✅
Route::get('/user/auth/bearer', [AuthBearerController::class, 'index']); //✅
Route::post('/user/auth/basic', [AuthBasicController::class, 'index']); //✅
Route::post('/user/create', [UserCreateController::class, 'index']); //✅

Route::middleware([CheckToken::class])->group(function () {

    Route::get('/task/read', [TaskReadController::class, 'index']); //✅
    Route::post('/task/create', [TaskCreateController::class, 'index']); //✅
    Route::post('/task/sort', [TaskSortController::class, 'index']); //✅
    Route::delete('/task/delete', [TaskDeleteController::class, 'index']); //✅

    Route::delete('/user/delete', [UserDeleteController::class, 'index']); //✅

    // WorkController のルート
    Route::get('/work/read/month', [WorkReadMonthController::class, 'index']); //✅
    Route::post('/work/create', [WorkCreateController::class, 'index']); //✅
    Route::delete('/work/delete', [WorkDeleteController::class, 'index']); //✅
    Route::delete('/work/reset', [WorkController::class, 'reset']);

    // InvitationController のルート
    Route::get('/invitation/read', [InvitationReadController::class, 'index']); //✅
    Route::post('/invitation/create', [InvitationController::class, 'create']);
    Route::put('/invitation/update', [InvitationController::class, 'update']);
    Route::delete('/invitation/delete', [InvitationController::class, 'delete']);
});
