<?php

$frontendOrigins = array_values(array_filter([
    env('FRONTEND_URL'),
    env('FRONTEND_ALT_URL'),
    'http://127.0.0.1:5173',
    'http://localhost:5173',
]));

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $frontendOrigins === [] ? ['*'] : $frontendOrigins,

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
