<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['client_id', 'result_key', 'quiz_answers', 'consent'])]
class Quiz extends Model
{
    protected function casts(): array
    {
        return [
            'quiz_answers' => 'array',
            'consent' => 'boolean',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
