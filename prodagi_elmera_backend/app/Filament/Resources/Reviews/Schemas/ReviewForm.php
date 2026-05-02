<?php

namespace App\Filament\Resources\Reviews\Schemas;

use App\Models\Tariff;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Имя или профессия')
                    ->required()
                    ->maxLength(255),

                Select::make('tariff_id')
                    ->label('Тариф')
                    ->options(fn () => Tariff::query()->where('is_active', true)->pluck('title', 'id'))
                    ->searchable()
                    ->preload(),

                TextInput::make('rating')
                    ->label('Оценка')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5)
                    ->required(),

                Textarea::make('description')
                    ->label('Текст отзыва')
                    ->rows(6)
                    ->required()
                    ->maxLength(3000)
                    ->columnSpanFull(),
            ]);
    }
}
