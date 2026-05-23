<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('telegram')->nullable()->index();
            $table->string('email')->nullable()->index();
            $table->timestamps();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained('clients')->nullOnDelete();
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained('clients')->nullOnDelete();
        });

        Schema::table('questionnaires', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained('clients')->nullOnDelete();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained('clients')->nullOnDelete();
        });

        $resolveClientId = function (?string $name, ?string $telegram = null, ?string $email = null, bool $reuseByContact = true): int {
            $name = $name !== null ? trim($name) : null;
            $telegram = $telegram !== null ? trim($telegram) : null;
            $email = $email !== null ? trim($email) : null;

            $name = $name === '' ? null : $name;
            $telegram = $telegram === '' ? null : $telegram;
            $email = $email === '' ? null : $email;

            $client = null;

            if ($reuseByContact && $email) {
                $client = DB::table('clients')->where('email', $email)->first();
            }

            if (!$client && $reuseByContact && $telegram) {
                $client = DB::table('clients')->where('telegram', $telegram)->first();
            }

            if ($client) {
                $updates = [];

                if (empty($client->name) && $name) {
                    $updates['name'] = $name;
                }

                if (empty($client->telegram) && $telegram) {
                    $updates['telegram'] = $telegram;
                }

                if (empty($client->email) && $email) {
                    $updates['email'] = $email;
                }

                if ($updates !== []) {
                    $updates['updated_at'] = now();
                    DB::table('clients')->where('id', $client->id)->update($updates);
                }

                return (int) $client->id;
            }

            return (int) DB::table('clients')->insertGetId([
                'name' => $name ?: 'Клиент',
                'telegram' => $telegram,
                'email' => $email,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        };

        foreach (DB::table('reviews')->select('id', 'name')->whereNull('client_id')->orderBy('id')->get() as $review) {
            DB::table('reviews')->where('id', $review->id)->update([
                'client_id' => $resolveClientId($review->name, null, null, false),
            ]);
        }

        foreach (DB::table('quizzes')->select('id', 'name', 'telegram')->whereNull('client_id')->orderBy('id')->get() as $quiz) {
            DB::table('quizzes')->where('id', $quiz->id)->update([
                'client_id' => $resolveClientId($quiz->name, $quiz->telegram),
            ]);
        }

        foreach (DB::table('questionnaires')->select('id', 'full_name', 'telegram_link')->whereNull('client_id')->orderBy('id')->get() as $questionnaire) {
            DB::table('questionnaires')->where('id', $questionnaire->id)->update([
                'client_id' => $resolveClientId($questionnaire->full_name, $questionnaire->telegram_link),
            ]);
        }

        foreach (DB::table('orders')->select('id', 'name', 'telegram', 'email')->whereNull('client_id')->orderBy('id')->get() as $order) {
            DB::table('orders')->where('id', $order->id)->update([
                'client_id' => $resolveClientId($order->name, $order->telegram, $order->email),
            ]);
        }

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('name');
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropColumn(['name', 'telegram']);
        });

        Schema::table('questionnaires', function (Blueprint $table) {
            $table->dropColumn(['full_name', 'telegram_link']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['name', 'telegram', 'email']);
        });
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
            $table->string('telegram')->nullable()->after('name');
        });

        Schema::table('questionnaires', function (Blueprint $table) {
            $table->string('full_name')->nullable()->after('id');
            $table->string('telegram_link')->nullable()->after('full_name');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
            $table->string('telegram')->nullable()->after('name');
            $table->string('email')->nullable()->after('phone');
        });

        foreach (DB::table('reviews')
            ->join('clients', 'reviews.client_id', '=', 'clients.id')
            ->select('reviews.id', 'clients.name')
            ->get() as $review) {
            DB::table('reviews')->where('id', $review->id)->update([
                'name' => $review->name,
            ]);
        }

        foreach (DB::table('quizzes')
            ->join('clients', 'quizzes.client_id', '=', 'clients.id')
            ->select('quizzes.id', 'clients.name', 'clients.telegram')
            ->get() as $quiz) {
            DB::table('quizzes')->where('id', $quiz->id)->update([
                'name' => $quiz->name,
                'telegram' => $quiz->telegram,
            ]);
        }

        foreach (DB::table('questionnaires')
            ->join('clients', 'questionnaires.client_id', '=', 'clients.id')
            ->select('questionnaires.id', 'clients.name', 'clients.telegram')
            ->get() as $questionnaire) {
            DB::table('questionnaires')->where('id', $questionnaire->id)->update([
                'full_name' => $questionnaire->name,
                'telegram_link' => $questionnaire->telegram,
            ]);
        }

        foreach (DB::table('orders')
            ->join('clients', 'orders.client_id', '=', 'clients.id')
            ->select('orders.id', 'clients.name', 'clients.telegram', 'clients.email')
            ->get() as $order) {
            DB::table('orders')->where('id', $order->id)->update([
                'name' => $order->name,
                'telegram' => $order->telegram,
                'email' => $order->email,
            ]);
        }

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
        });

        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
        });

        Schema::table('questionnaires', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
        });

        Schema::dropIfExists('clients');
    }
};
