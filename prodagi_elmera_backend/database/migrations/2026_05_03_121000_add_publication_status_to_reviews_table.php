<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            if (! Schema::hasColumn('reviews', 'publication_status')) {
                $table->string('publication_status')
                    ->default('published')
                    ->after('is_published');
            }
        });

        DB::table('reviews')
            ->where('is_published', true)
            ->update(['publication_status' => 'published']);

        DB::table('reviews')
            ->where('is_published', false)
            ->whereNull('publication_status')
            ->update(['publication_status' => 'pending']);
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            if (Schema::hasColumn('reviews', 'publication_status')) {
                $table->dropColumn('publication_status');
            }
        });
    }
};
