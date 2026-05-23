<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuizRequest;
use App\Http\Requests\QuizResultRequest;
use App\Models\Quiz;
use App\Support\ClientResolver;
use Illuminate\Support\Arr;

class QuizController extends Controller
{
    public function index()
    {
        return response()->json(Quiz::with('client')->get());
    }

    public function store(QuizRequest $request, ClientResolver $clientResolver)
    {
        $validated = $request->validated();
        $client = $clientResolver->resolve($validated['name'], $validated['telegram']);

        $quiz = Quiz::create([
            ...Arr::except($validated, ['name', 'telegram']),
            'client_id' => $client->id,
        ]);

        return response()->json($quiz);
    }

    public function update(QuizResultRequest $request, Quiz $quiz)
    {
       $quiz->update($request->validated());
       return response()->json($quiz->fresh());
    }
}
