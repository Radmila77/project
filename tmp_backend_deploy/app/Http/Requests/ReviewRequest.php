<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:3|max:3000',
            'rating' => 'required|integer|min:1|max:5',
            'tariff_id' => 'nullable|integer|exists:tariffs,id',
            'consent' => 'required|accepted',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function attributes(): array
    {
        return [
            'rating' => 'оценка',
            'tariff_id' => 'тариф',
            'consent' => 'согласие на обработку персональных данных',
        ];
    }
}
