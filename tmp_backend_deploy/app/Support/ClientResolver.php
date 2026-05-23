<?php

namespace App\Support;

use App\Models\Client;

class ClientResolver
{
    public function resolve(
        ?string $name = null,
        ?string $telegram = null,
        ?string $email = null,
        bool $reuseByContact = true,
    ): Client {
        $name = $this->normalize($name);
        $telegram = $this->normalizeTelegram($telegram);
        $email = $this->normalize($email);

        $client = null;

        if ($reuseByContact && $email) {
            $client = Client::query()->where('email', $email)->first();
        }

        if (!$client && $reuseByContact && $telegram) {
            $client = Client::query()
                ->whereIn('telegram', $this->telegramLookupVariants($telegram))
                ->first();
        }

        if ($client) {
            $updates = [];

            if (!$client->name && $name) {
                $updates['name'] = $name;
            }

            if (!$client->telegram && $telegram) {
                $updates['telegram'] = $telegram;
            }

            if (!$client->email && $email) {
                $updates['email'] = $email;
            }

            if ($updates !== []) {
                $client->update($updates);
            }

            return $client;
        }

        return Client::query()->create([
            'name' => $name ?: 'Клиент',
            'telegram' => $telegram,
            'email' => $email,
        ]);
    }

    private function normalize(?string $value): ?string
    {
        $value = $value !== null ? trim($value) : null;

        return $value === '' ? null : $value;
    }

    private function normalizeTelegram(?string $value): ?string
    {
        $value = $this->normalize($value);

        if ($value === null) {
            return null;
        }

        return str_starts_with($value, '@') ? $value : '@' . $value;
    }

    private function telegramLookupVariants(string $telegram): array
    {
        $withoutAt = ltrim($telegram, '@');

        return array_values(array_unique([
            $telegram,
            $withoutAt,
            '@' . $withoutAt,
        ]));
    }
}
