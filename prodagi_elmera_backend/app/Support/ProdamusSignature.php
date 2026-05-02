<?php

namespace App\Support;

class ProdamusSignature
{
    public static function sign(array $data, string $secretKey): string
    {
        $normalized = self::normalize($data);
        self::sortRecursive($normalized);

        return hash_hmac('sha256', json_encode($normalized), $secretKey);
    }

    public static function verify(array $data, string $secretKey, ?string $signature): bool
    {
        if (!$signature) {
            return false;
        }

        unset($data['signature'], $data['Sign']);

        return hash_equals(self::sign($data, $secretKey), $signature);
    }

    private static function normalize(array $data): array
    {
        $normalized = [];

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $normalized[$key] = self::normalize($value);
                continue;
            }

            if (is_bool($value)) {
                $normalized[$key] = $value ? '1' : '0';
                continue;
            }

            if (is_null($value)) {
                $normalized[$key] = '';
                continue;
            }

            $normalized[$key] = (string) $value;
        }

        return $normalized;
    }

    private static function sortRecursive(array &$data): void
    {
        ksort($data);

        foreach ($data as &$value) {
            if (is_array($value)) {
                self::sortRecursive($value);
            }
        }
    }
}
