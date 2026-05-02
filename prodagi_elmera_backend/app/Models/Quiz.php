<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'telegram', 'result_key', 'quiz_answers', 'consent'])]
class Quiz extends Model
{
    protected function casts(): array
    {
        return [
            'quiz_answers' => 'array',
            'consent' => 'boolean',
        ];
    }
}
