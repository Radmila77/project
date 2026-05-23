<?php

namespace App\Support;

use App\Models\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class OrderTelegramNotifier
{
    public function send(Order $order, string $status): void
    {
        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');
        $order->loadMissing('client');

        if (!$botToken || !$chatId || $this->alreadySent($order, $status)) {
            return;
        }

        try {
            $response = Http::asForm()
                ->connectTimeout(5)
                ->timeout(8)
                ->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => $this->buildMessage($order, $status),
                ]);
        } catch (Throwable $exception) {
            Log::warning('Telegram notification failed', [
                'order_id' => $order->id,
                'status' => $status,
                'message' => $exception->getMessage(),
            ]);

            return;
        }

        if ($response->successful() && $order->exists) {
            $field = $this->fieldForStatus($status);

            if ($field) {
                $order->forceFill([
                    $field => Carbon::now(),
                ])->save();
            }
        }
    }

    private function buildMessage(Order $order, string $status): string
    {
        $tariffLabel = config("services.prodamus.tariffs.{$order->tariff}.label") ?? $order->tariff;
        $statusTitle = match ($status) {
            'pending' => 'Новая заявка на оплату',
            'abandoned' => 'Оплата не завершена',
            default => 'Оплата подтверждена',
        };

        $statusText = match ($status) {
            'pending' => 'перешёл к оплате',
            'abandoned' => 'не оплатил',
            default => 'оплачено',
        };

        $lines = [
            $statusTitle,
            '',
            'Имя: ' . ($order->client?->name ?: 'не указано'),
            'Телефон: ' . ($order->phone ?: 'не указан'),
            'Telegram: ' . ($order->client?->telegram ?: 'не указан'),
            'Email: ' . ($order->client?->email ?: 'не указан'),
            "Тариф: {$tariffLabel}",
            "Статус: {$statusText}",
        ];

        return implode("\n", $lines);
    }

    private function alreadySent(Order $order, string $status): bool
    {
        $field = $this->fieldForStatus($status);

        return $field ? !empty($order->{$field}) : false;
    }

    private function fieldForStatus(string $status): ?string
    {
        return match ($status) {
            'pending' => 'telegram_pending_sent_at',
            'paid' => 'telegram_paid_sent_at',
            'abandoned' => 'telegram_abandoned_sent_at',
            default => null,
        };
    }
}
