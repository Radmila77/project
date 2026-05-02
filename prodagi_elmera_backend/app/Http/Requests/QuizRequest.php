<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class QuizRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function attributes(): array
    {
        return [
            'telegram' => 'телеграм',
        ];
    }


    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:100',
            'telegram' => 'required|string|min:3|max:100|regex:/^@[A-Za-z0-9_]+$/',
            'consent' => 'required|accepted',
        ];
    }
}
