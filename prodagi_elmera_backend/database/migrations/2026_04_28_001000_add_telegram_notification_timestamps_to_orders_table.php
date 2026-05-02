<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'telegram_pending_sent_at')) {
                $table->timestamp('telegram_pending_sent_at')->nullable()->after('paid_at');
            }

            if (!Schema::hasColumn('orders', 'telegram_paid_sent_at')) {
                $table->timestamp('telegram_paid_sent_at')->nullable()->after('telegram_pending_sent_at');
            }

            if (!Schema::hasColumn('orders', 'telegram_abandoned_sent_at')) {
                $table->timestamp('telegram_abandoned_sent_at')->nullable()->after('telegram_paid_sent_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $columns = [
                'telegram_pending_sent_at',
                'telegram_paid_sent_at',
                'telegram_abandoned_sent_at',
            ];

            $existingColumns = array_filter($columns, fn (string $column) => Schema::hasColumn('orders', $column));

            if (!empty($existingColumns)) {
                $table->dropColumn($existingColumns);
            }
        });
    }
};
