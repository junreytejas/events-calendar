<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('events','EventsController@index');
// Route::get('events', 'app\Http\Controllers\EventsController@index');
// Route::group(['prefix' => 'event'], function () {
//     Route::post('add', 'EventsController@add');
//     Route::get('edit/{id}', 'EventsController@edit');
//     Route::post('update/{id}', 'EventsController@update');
//     Route::delete('delete/{id}', 'EventsController@delete');
// });


Route::middleware('api')->get('events', [EventsController::class, 'index', 'https']);
Route::middleware('api')->post('events/create', [EventsController::class, 'create', 'https']);

