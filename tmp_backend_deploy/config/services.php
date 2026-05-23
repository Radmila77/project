<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'frontend' => [
        'url' => env('FRONTEND_URL', 'http://127.0.0.1:5173'),
        'workshop_url' => env('FRONTEND_WORKSHOP_URL', 'http://127.0.0.1:5173/workshop'),
    ],

    'prodamus' => [
        'secret_key' => env('PRODAMUS_SECRET_KEY'),
        'tariffs' => [
            'standard' => [
                'label' => 'Стандарт',
                'price' => '4990',
                'payform_url' => env('PRODAMUS_STANDARD_URL'),
                'channel_url' => env('PRODAMUS_STANDARD_CHANNEL_URL'),
            ],
            'vip' => [
                'label' => 'VIP',
                'price' => '15490',
                'payform_url' => env('PRODAMUS_VIP_URL'),
                'channel_url' => env('PRODAMUS_VIP_CHANNEL_URL'),
            ],
        ],
    ],

    'telegram' => [
        'bot_token' => env('TELEGRAM_BOT_TOKEN'),
        'chat_id' => env('TELEGRAM_CHAT_ID'),
    ],

];
