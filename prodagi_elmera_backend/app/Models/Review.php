<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['name', 'description', 'rating', 'tariff_id'])]
class Review extends Model
{
    public function tariff(): BelongsTo
    {
        return $this->belongsTo(Tariff::class);
    }
}
