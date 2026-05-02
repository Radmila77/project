<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Support\OrderTelegramNotifier;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class MarkAbandonedOrders extends Command
{
    protected $signature = 'orders:mark-abandoned {--minutes=30 : Через сколько минут считать заказ брошенным}';

    protected $description = 'Переводит старые pending-заказы в abandoned и отправляет уведомление в Telegram';

    public function handle(OrderTelegramNotifier $notifier): int
    {
        $minutes = (int) $this->option('minutes');
        $borderTime = Carbon::now()->subMinutes($minutes);

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

        return self::SUCCESS;
    }
}
