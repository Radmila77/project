<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('telegram_link');
            $table->string('niche_and_expertise');
            $table->string('current_offer_and_check');
            $table->string('social_platforms_and_sales');
            $table->string('monthly_income');
            $table->string('nearest_income_goal');
            $table->string('income_barrier');
            $table->string('desired_result');
            $table->boolean('consent_personal_data')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questionnaires');
    }
};
