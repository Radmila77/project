<?php

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\QuestionnaireController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;


Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);

Route::get('/quizzes', [QuizController::class, 'index']);
Route::post('/quizzes', [QuizController::class, 'store']);
Route::post('/quizzes/{quiz}/result', [QuizController::class, 'update']);

Route::get('/questionnaires', [QuestionnaireController::class, 'index']);
Route::post('/questionnaires', [QuestionnaireController::class, 'store']);

Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/prodamus/webhook', [OrderController::class, 'webhook']);
