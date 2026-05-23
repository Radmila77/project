<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionnaireRequest;
use App\Models\Questionnaire;
use App\Support\ClientResolver;
use Illuminate\Support\Arr;

class QuestionnaireController extends Controller
{
    public function index()
    {
        return response()->json(Questionnaire::with('client')->get());
    }

    public function store(QuestionnaireRequest $request, ClientResolver $clientResolver)
    {
        $validated = $request->validated();
        $client = $clientResolver->resolve($validated['full_name'], $validated['telegram_link']);

        $questionnaire = Questionnaire::create([
            ...Arr::except($validated, ['full_name', 'telegram_link']),
            'client_id' => $client->id,
        ]);

        return response()->json($questionnaire);
    }
}
