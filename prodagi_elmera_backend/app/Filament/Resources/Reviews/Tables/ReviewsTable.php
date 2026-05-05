<?php

namespace App\Filament\Resources\Reviews\Tables;

use App\Models\Review;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Placeholder;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\HtmlString;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Имя')
                    ->searchable(),

                TextColumn::make('is_published')
                    ->label('Статус')
                    ->state(fn (Review $record): string => $record->publication_status)
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'published' => 'Опубликован',
                        'unpublished' => 'Снято с публикации',
                        default => 'На модерации',
                    })
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'unpublished' => 'gray',
                        default => 'warning',
                    }),

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

                SelectFilter::make('publication_status')
                    ->label('Статус')
                    ->options([
                        'pending' => 'На модерации',
                        'published' => 'Опубликован',
                        'unpublished' => 'Снято с публикации',
                    ]),
            ])
            ->recordActions([
                ViewAction::make()
                    ->label('Просмотр')
                    ->icon(Heroicon::OutlinedEye)
                    ->modalWidth('3xl')
                    ->schema([
                        Section::make('Информация об отзыве')
                            ->schema([
                                Placeholder::make('name')
                                    ->label('Имя / подпись')
                                    ->content(fn (Review $record): string => $record->name),

                                Placeholder::make('tariff')
                                    ->label('Тариф')
                                    ->content(fn (Review $record): string => $record->tariff?->title ?? 'Без тарифа'),

                                Placeholder::make('rating')
                                    ->label('Оценка')
                                    ->content(fn (Review $record): string => "{$record->rating}/5"),

                                Placeholder::make('status')
                                    ->label('Статус')
                                    ->content(fn (Review $record): string => match ($record->publication_status) {
                                        'published' => 'Опубликован',
                                        'unpublished' => 'Снято с публикации',
                                        default => 'На модерации',
                                    }),

                                Placeholder::make('description')
                                    ->label('Текст отзыва')
                                    ->content(fn (Review $record): HtmlString => new HtmlString(nl2br(e($record->description))))
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
                    ]),

                Action::make('publish')
                    ->label('Опубликовать')
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn (Review $record): bool => ! $record->is_published)
                    ->action(function (Review $record): void {
                        $record->update([
                            'is_published' => true,
                            'publication_status' => 'published',
                        ]);

                        Notification::make()
                            ->title('Отзыв опубликован')
                            ->success()
                            ->send();
                    }),

                Action::make('unpublish')
                    ->label('Снять с публикации')
                    ->icon(Heroicon::OutlinedXCircle)
                    ->color('gray')
                    ->requiresConfirmation()
                    ->visible(fn (Review $record): bool => $record->is_published)
                    ->action(function (Review $record): void {
                        $record->update([
                            'is_published' => false,
                            'publication_status' => 'unpublished',
                        ]);

                        Notification::make()
                            ->title('Отзыв снят с публикации')
                            ->success()
                            ->send();
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
