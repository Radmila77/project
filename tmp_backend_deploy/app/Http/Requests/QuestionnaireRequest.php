<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class QuestionnaireRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|min:3|max:255',
            'telegram_link' => 'required|string|min:3|max:100|regex:/^@?[A-Za-z0-9_]+$/',
            'niche_and_expertise' => 'required|string|min:3|max:255',
            'current_offer_and_check' => 'required|string|min:3|max:255',
            'social_platforms_and_sales' => 'required|string|min:3|max:255',
            'monthly_income' => 'required|string',
            'nearest_income_goal' => 'required|string|min:3|max:255',
            'income_barrier' => 'required|string',
            'desired_result' => 'required|string|min:3|max:255',
            'consent_personal_data' => 'required|accepted',
        ];
    }

    public function attributes(): array
    {
        return [
            'full_name' => 'имя и фамилия',
            'telegram_link' => 'телеграм',
            'niche_and_expertise' => 'описание',
            'current_offer_and_check' => 'описание',
            'social_platforms_and_sales' => 'описание',
            'monthly_income' => 'выбор',
            'nearest_income_goal' => 'описание',
            'income_barrier' => 'выбор',
            'desired_result' => 'описание',
        ];
    }
}
