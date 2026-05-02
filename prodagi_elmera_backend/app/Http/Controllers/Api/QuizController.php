<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuizRequest;
use App\Http\Requests\QuizResultRequest;
use App\Models\Quiz;

class QuizController extends Controller
{
    public function index()
    {

        return response()->json(Quiz::all());
    }

    public function store(QuizRequest $request)
    {
      $quiz = Quiz::create($request->validated());
      return response()->json($quiz);
    }

    public function update(QuizResultRequest $request, Quiz $quiz)
    {
       $quiz->update($request->validated());
       return response()->json($quiz->fresh());
    }
}
