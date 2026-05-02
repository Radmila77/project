<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['full_name', 'telegram_link', 'niche_and_expertise', 'current_offer_and_check', 'social_platforms_and_sales', 'monthly_income', 'nearest_income_goal', 'income_barrier', 'desired_result', 'consent_personal_data'])]
class Questionnaire extends Model
{
    //
}
