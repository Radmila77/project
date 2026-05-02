<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Mail\WorkshopAccessMail;
use App\Models\Order;
use App\Support\OrderTelegramNotifier;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function store(OrderRequest $request, OrderTelegramNotifier $notifier)
    {
        $validated = $request->validated();
        $tariffConfig = config("services.prodamus.tariffs.{$validated['tariff']}");

        if (!$tariffConfig || empty($tariffConfig['payform_url'])) {
            return response()->json([
                'message' => 'Ссылка на оплату для выбранного тарифа не настроена.',
            ], 500);
        }

        $order = Order::create([
            ...$validated,
            'status' => 'pending',
        ]);

        $paymentUrl = $this->buildPaymentUrl($order, $tariffConfig['payform_url'], $tariffConfig['label']);

        $order->update([
            'prodamus_payment_url' => $paymentUrl,
        ]);

        $notifier->send($order, 'pending');

        return response()->json([
            'order_id' => $order->id,
            'payment_url' => $paymentUrl,
        ]);
    }

    public function webhook(Request $request, OrderTelegramNotifier $notifier)
    {
        $payload = $request->all();
        $externalOrderNumber = $payload['order_num']
            ?? $payload['Order_num']
            ?? $payload['order_id']
            ?? $payload['Order_id']
            ?? null;
        $customerEmail = $payload['customer_email'] ?? $payload['Customer_email'] ?? null;
        $customerPhone = $payload['customer_phone'] ?? $payload['Customer_phone'] ?? null;
        $paymentStatus = $payload['payment_status'] ?? $payload['Payment_status'] ?? null;

        if ($paymentStatus && $paymentStatus !== 'success') {
            return response()->json([
                'message' => 'Платёж ещё не подтверждён.',
            ]);
        }

        $orderId = $this->extractOrderId($externalOrderNumber);
        $tariff = $this->resolveTariffFromPayload($payload);
        $order = $orderId ? Order::find($orderId) : null;

        if (!$order) {
            $order = Order::query()
                ->when($customerEmail, fn ($query) => $query->where('email', $customerEmail))
                ->when($tariff, fn ($query) => $query->where('tariff', $tariff))
                ->where('status', 'pending')
                ->latest('id')
                ->first();
        }

        if (!$order && $customerEmail && $tariff) {
            $order = Order::create([
                'name' => 'Покупатель Prodamus',
                'telegram' => '',
                'phone' => $customerPhone,
                'email' => $customerEmail,
                'tariff' => $tariff,
                'status' => 'pending',
            ]);
        }

        if (!$order) {
            return response()->json([
                'message' => 'Не удалось сопоставить заказ с оплатой.',
            ], 404);
        }

        if ($order->status !== 'paid') {
            $order->update([
                'phone' => $customerPhone ?: $order->phone,
                'email' => $customerEmail ?: $order->email,
                'tariff' => $tariff ?: $order->tariff,
                'status' => 'paid',
                'paid_at' => Carbon::now(),
            ]);

            $this->sendWorkshopAccessEmail($order);
            $notifier->send($order->fresh(), 'paid');
        }

        return response()->json([
            'message' => 'Webhook обработан.',
        ]);
    }

    public function testTelegram(OrderTelegramNotifier $notifier)
    {
        $order = new Order([
            'name' => 'Тестовый покупатель',
            'telegram' => '@test_buyer',
            'phone' => '+79990000000',
            'email' => 'test@example.com',
            'tariff' => 'vip',
        ]);

        $notifier->send($order, 'paid');

        return response()->json([
            'message' => 'Тестовое уведомление в Telegram отправлено.',
        ]);
    }

    private function buildPaymentUrl(Order $order, string $baseUrl, string $tariffLabel): string
    {
        return $baseUrl;
    }

    private function buildExternalOrderNumber(Order $order): string
    {
        return 'workshop-order-' . $order->id;
    }

    private function extractOrderId(?string $externalOrderNumber): ?int
    {
        if (!$externalOrderNumber) {
            return null;
        }

        if (preg_match('/workshop-order-(\d+)/', $externalOrderNumber, $matches)) {
            return (int) $matches[1];
        }

        return is_numeric($externalOrderNumber) ? (int) $externalOrderNumber : null;
    }

    private function resolveTariffFromPayload(array $payload): ?string
    {
        $sum = (string) ($payload['sum'] ?? $payload['Sum'] ?? '');
        $products = $payload['products'] ?? $payload['Products'] ?? [];

        if ($sum === '4990.00' || $sum === '4990') {
            return 'standard';
        }

        if ($sum === '15490.00' || $sum === '15490') {
            return 'vip';
        }

        $productsText = mb_strtolower(json_encode($products, JSON_UNESCAPED_UNICODE));

        if (str_contains($productsText, 'vip')) {
            return 'vip';
        }

        if (str_contains($productsText, 'стандарт')) {
            return 'standard';
        }

        return null;
    }

    private function sendWorkshopAccessEmail(Order $order): void
    {
        $tariffConfig = config("services.prodamus.tariffs.{$order->tariff}");
        $channelUrl = $tariffConfig['channel_url'] ?? null;
        $tariffLabel = $tariffConfig['label'] ?? $order->tariff;

        if (!$channelUrl) {
            return;
        }

        Mail::to($order->email)->send(new WorkshopAccessMail($order, $channelUrl, $tariffLabel));
    }
}
