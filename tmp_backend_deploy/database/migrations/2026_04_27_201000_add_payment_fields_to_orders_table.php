<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'name')) {
                $table->string('name');
            }

            if (!Schema::hasColumn('orders', 'telegram')) {
                $table->string('telegram');
            }

            if (!Schema::hasColumn('orders', 'phone')) {
                $table->string('phone')->nullable();
            }

            if (!Schema::hasColumn('orders', 'email')) {
                $table->string('email');
            }

            if (!Schema::hasColumn('orders', 'tariff')) {
                $table->string('tariff');
            }

            if (!Schema::hasColumn('orders', 'prodamus_payment_url')) {
                $table->text('prodamus_payment_url')->nullable();
            }

            if (!Schema::hasColumn('orders', 'status')) {
                $table->string('status')->default('pending');
            }

            if (!Schema::hasColumn('orders', 'paid_at')) {
                $table->timestamp('paid_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $columns = [
                'name',
                'telegram',
                'phone',
                'email',
                'tariff',
                'prodamus_payment_url',
                'status',
                'paid_at',
            ];

            $existingColumns = array_filter($columns, fn (string $column) => Schema::hasColumn('orders', $column));

            if (!empty($existingColumns)) {
                $table->dropColumn($existingColumns);
            }
        });
    }
};
