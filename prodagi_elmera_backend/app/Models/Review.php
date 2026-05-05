<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['name', 'description', 'rating', 'tariff_id', 'is_published', 'publication_status'])]
class Review extends Model
{
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function tariff(): BelongsTo
    {
        return $this->belongsTo(Tariff::class);
    }
}
