<?php

namespace App\Filament\Resources\Reviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Имя')
                    ->searchable(),

                TextColumn::make('tariff.title')
                    ->label('Тариф')
                    ->badge()
                    ->placeholder('Без тарифа'),

                TextColumn::make('rating')
                    ->label('Оценка')
                    ->sortable(),

                TextColumn::make('description')
                    ->label('Отзыв')
                    ->limit(80),

                TextColumn::make('created_at')
                    ->label('Создан')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('tariff_id')
                    ->label('Фильтр по тарифу')
                    ->relationship('tariff', 'title'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
