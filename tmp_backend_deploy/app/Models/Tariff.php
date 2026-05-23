<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['key', 'title', 'price', 'description', 'is_active'])]
class Tariff extends Model
{
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
