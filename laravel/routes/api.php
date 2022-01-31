<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckToken;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user/test_authentication', 'UserController@test_authentication');//型付け終了
Route::post('/user/basic_authentication', 'UserController@basic_authentication');//型付け終了
Route::get('/user/bearer_authentication', 'UserController@bearer_authentication');//型付け終了
Route::post('/user/create', 'UserController@create');//型付け終了

Route::middleware([CheckToken::class])->group(function () {
    Route::post('/task/sortset', 'TaskController@sortset');//型付け終了
    Route::post('/task/create', 'TaskController@create');//型付け終了
    Route::get('/task/read', 'TaskController@read');//型付け終了
    Route::delete('/task/delete', 'TaskController@delete');//型付け終了

    Route::put('/user/update/room_id', 'UserController@updateRoomId');//型付け終了
    Route::delete('/user/delete', 'UserController@delete');//型付け終了

    Route::post('/work/create', 'WorkController@create');//型付け終了
    Route::get('/work/read/calendar', 'WorkController@read_calendar');//型付け終了
    Route::post('/work/read/analytics', 'WorkController@read_analytics');//型付け終了
    Route::delete('/work/delete', 'WorkController@delete');//型付け終了

    Route::post('/room/create', 'RoomController@create');//型付け終了

    Route::post('/invitation/create', 'InvitationController@create');//型付け終了
    Route::put('/invitation/update', 'InvitationController@update');//型付け終了
    Route::delete('/invitation/delete', 'InvitationController@delete');//型付け終了
});