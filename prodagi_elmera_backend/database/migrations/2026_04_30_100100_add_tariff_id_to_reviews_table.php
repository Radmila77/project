<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            if (! Schema::hasColumn('reviews', 'tariff_id')) {
                $table->foreignId('tariff_id')
                    ->nullable()
                    ->after('rating')
                    ->constrained('tariffs')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            if (Schema::hasColumn('reviews', 'tariff_id')) {
                $table->dropConstrainedForeignId('tariff_id');
            }
        });
    }
};
