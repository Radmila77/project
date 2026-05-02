<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name',
        'telegram',
        'phone',
        'email',
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
}
