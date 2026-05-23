<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Доступ к закрытому каналу практикума</title>
</head>
<body style="margin:0;padding:24px;background:#f7f1ee;font-family:Arial,sans-serif;color:#351316;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #f0dfdf;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8f272f;font-weight:700;">
            Оплата подтверждена
        </p>
        <h1 style="margin:0 0 18px;font-size:28px;line-height:1.15;color:#4c0d10;">
            Доступ к закрытому каналу готов
        </h1>
        <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#5c4b4d;">
            {{ $order->name }}, спасибо за оплату практикума. Ваш тариф:
            <strong>{{ $tariffLabel }}</strong>.
        </p>
        <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#5c4b4d;">
            Переходите по ссылке ниже и заходите в закрытый канал практикума:
        </p>
        <p style="margin:0 0 28px;">
            <a href="{{ $channelUrl }}" style="display:inline-block;padding:14px 24px;border-radius:999px;background:#7a0f17;color:#ffffff;text-decoration:none;font-weight:700;">
                Перейти в закрытый канал
            </a>
        </p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#7b6a6c;">
            Если кнопка не открывается, скопируйте ссылку вручную:
            <br>
            <a href="{{ $channelUrl }}" style="color:#7a0f17;">{{ $channelUrl }}</a>
        </p>
    </div>
</body>
</html>
