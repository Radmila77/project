<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'client_id',
        'phone',
        'tariff',
        'prodamus_payment_url',
        'status',
        'paid_at',
        'telegram_pending_sent_at',
        'telegram_paid_sent_at',
        'telegram_abandoned_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'paid_at' => 'datetime',
            'telegram_pending_sent_at' => 'datetime',
            'telegram_paid_sent_at' => 'datetime',
            'telegram_abandoned_sent_at' => 'datetime',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
