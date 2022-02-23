<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckToken;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user/test_authentication', 'UserController@test_authentication');
Route::post('/user/basic_authentication', 'UserController@basic_authentication');
Route::get('/user/bearer_authentication', 'UserController@bearer_authentication');
Route::post('/user/create', 'UserController@create');

Route::middleware([CheckToken::class])->group(function () {
    Route::post('/task/sortset', 'TaskController@sortset');
    Route::post('/task/create', 'TaskController@create');
    Route::get('/task/read', 'TaskController@read');
    Route::delete('/task/delete', 'TaskController@delete');

    Route::put('/user/update/room_id', 'UserController@updateRoomId');
    Route::delete('/user/delete', 'UserController@delete');

    Route::post('/work/create', 'WorkController@create');
    Route::get('/work/read/calendar', 'WorkController@read_calendar');
    Route::post('/work/read/analytics', 'WorkController@read_analytics');
    Route::delete('/work/delete', 'WorkController@delete');
    
    Route::get('/goal/read', 'GoalController@read');
    
    Route::post('/room/create', 'RoomController@create');

    Route::post('/invitation/create', 'InvitationController@create');
    Route::put('/invitation/update', 'InvitationController@update');
    Route::delete('/invitation/delete', 'InvitationController@delete');
});