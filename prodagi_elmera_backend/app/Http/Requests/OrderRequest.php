<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:100',
            'telegram' => 'required|string|min:3|max:100|regex:/^@[A-Za-z0-9_]+$/',
            'email' => 'required|string|email:rfc,dns|max:255',
            'tariff' => 'required|string|in:standard,vip',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'имя',
            'telegram' => 'телеграм',
            'email' => 'почта',
            'tariff' => 'тариф',
        ];
    }
}
