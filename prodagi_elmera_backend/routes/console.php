<?php

use App\Models\Order;
use App\Support\OrderTelegramNotifier;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('orders:mark-abandoned {--minutes=30}', function () {
    $minutes = (int) $this->option('minutes');
    $borderTime = Carbon::now()->subMinutes($minutes);
    $notifier = app(OrderTelegramNotifier::class);

    $orders = Order::query()
        ->where('status', 'pending')
        ->whereNull('paid_at')
        ->whereNull('telegram_abandoned_sent_at')
        ->where('created_at', '<=', $borderTime)
        ->get();

    foreach ($orders as $order) {
        $order->update([
            'status' => 'abandoned',
        ]);

        $notifier->send($order, 'abandoned');
    }

    $this->info("Обработано брошенных заказов: {$orders->count()}.");
})->purpose('Переводит старые pending-заказы в abandoned и шлёт уведомление в Telegram');

Schedule::command('orders:mark-abandoned --minutes=30')->everyTenMinutes();
