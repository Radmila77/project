<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Support\ClientResolver;
use App\Support\OrderTelegramNotifier;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;

class OrderController extends Controller
{
    public function store(OrderRequest $request, OrderTelegramNotifier $notifier, ClientResolver $clientResolver)
    {
        $validated = $request->validated();
        $tariffConfig = config("services.prodamus.tariffs.{$validated['tariff']}");

        if (!$tariffConfig || empty($tariffConfig['payform_url'])) {
            return response()->json([
                'message' => 'Ссылка на оплату для выбранного тарифа не настроена.',
            ], 500);
        }

        $client = $clientResolver->resolve(
            $validated['name'],
            $validated['telegram'],
            $validated['email'],
        );

        $order = Order::create([
            ...Arr::except($validated, ['name', 'telegram', 'email', 'consent']),
            'client_id' => $client->id,
            'status' => 'pending',
        ]);

        $paymentUrl = $this->buildPaymentUrl($tariffConfig['payform_url']);

        $order->update([
            'prodamus_payment_url' => $paymentUrl,
        ]);

        $notifier->send($order, 'pending');

        return response()->json([
            'order_id' => $order->id,
            'payment_url' => $paymentUrl,
        ]);
    }

    public function webhook(Request $request, OrderTelegramNotifier $notifier, ClientResolver $clientResolver)
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
                ->with('client')
                ->when(
                    $customerEmail,
                    fn ($query) => $query->whereHas(
                        'client',
                        fn ($clientQuery) => $clientQuery->where('email', $customerEmail)
                    )
                )
                ->when($tariff, fn ($query) => $query->where('tariff', $tariff))
                ->where('status', 'pending')
                ->latest('id')
                ->first();
        }

        if (!$order && $customerEmail && $tariff) {
            $client = $clientResolver->resolve('Покупатель Prodamus', null, $customerEmail);

            $order = Order::create([
                'client_id' => $client->id,
                'phone' => $customerPhone,
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
            $client = $clientResolver->resolve(
                $order->client?->name,
                $order->client?->telegram,
                $customerEmail ?: $order->client?->email,
            );

            $order->update([
                'client_id' => $client->id,
                'phone' => $customerPhone ?: $order->phone,
                'tariff' => $tariff ?: $order->tariff,
                'status' => 'paid',
                'paid_at' => Carbon::now(),
            ]);

            $notifier->send($order->fresh(), 'paid');
        }

        return response()->json([
            'message' => 'Webhook обработан.',
        ]);
    }

    private function buildPaymentUrl(string $baseUrl): string
    {
        return $baseUrl;
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
}
