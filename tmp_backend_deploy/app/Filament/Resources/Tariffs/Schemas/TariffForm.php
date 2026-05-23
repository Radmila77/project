<?php

namespace App\Filament\Resources\Tariffs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TariffForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->label('Ключ')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                TextInput::make('title')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),

                TextInput::make('price')
                    ->label('Цена')
                    ->numeric()
                    ->required(),

                Toggle::make('is_active')
                    ->label('Активен')
                    ->default(true),

                Textarea::make('description')
                    ->label('Описание')
                    ->rows(4)
                    ->columnSpanFull(),
            ]);
    }
}
