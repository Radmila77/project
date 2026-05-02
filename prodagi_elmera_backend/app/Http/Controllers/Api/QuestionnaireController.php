<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionnaireRequest;
use App\Models\Questionnaire;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    public function index()
    {
        return response()->json(Questionnaire::all());
    }

    public function store(QuestionnaireRequest $request)
    {
        $questionnaire = Questionnaire::create($request->validated());
        return response()->json($questionnaire);
    }
}
