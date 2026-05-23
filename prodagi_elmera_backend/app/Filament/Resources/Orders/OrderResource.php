<?php

namespace App\Filament\Resources\Orders;

use App\Filament\Resources\Orders\Pages\ListOrders;
use App\Models\Order;
use BackedEnum;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Placeholder;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCreditCard;

    protected static string|\UnitEnum|null $navigationGroup = 'Продажи';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Заказы';

    protected static ?string $modelLabel = 'заказ';

    protected static ?string $pluralModelLabel = 'Заказы';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Контакт клиента')
                    ->schema([
                        Placeholder::make('client_name')
                            ->label('Имя')
                            ->content(fn (?Order $record): string => $record?->client?->name ?? 'Не указано'),
                        Placeholder::make('client_telegram')
                            ->label('Telegram')
                            ->content(fn (?Order $record): string => $record?->client?->telegram ?? 'Не указан'),
                        Placeholder::make('client_email')
                            ->label('Email')
                            ->content(fn (?Order $record): string => $record?->client?->email ?? 'Не указан'),
                        Placeholder::make('phone')
                            ->label('Телефон')
                            ->content(fn (?Order $record): string => $record?->phone ?: 'Не указан'),
                    ])
                    ->columns(2),

                Section::make('Статус заказа')
                    ->schema([
                        Placeholder::make('tariff')
                            ->label('Тариф')
                            ->content(fn (?Order $record): string => static::formatTariff($record?->tariff)),
                        Placeholder::make('status')
                            ->label('Статус')
                            ->content(fn (?Order $record): string => static::formatStatus($record?->status)),
                        Placeholder::make('created_at')
                            ->label('Создан')
                            ->content(fn (?Order $record): string => $record?->created_at?->format('d.m.Y H:i') ?? '—'),
                        Placeholder::make('paid_at')
                            ->label('Оплачен')
                            ->content(fn (?Order $record): string => $record?->paid_at?->format('d.m.Y H:i') ?? 'Ещё не оплачен'),
                        Placeholder::make('pending_sent')
                            ->label('Telegram: переход к оплате')
                            ->content(fn (?Order $record): string => $record?->telegram_pending_sent_at?->format('d.m.Y H:i') ?? 'Не отправлялось'),
                        Placeholder::make('paid_sent')
                            ->label('Telegram: оплачено')
                            ->content(fn (?Order $record): string => $record?->telegram_paid_sent_at?->format('d.m.Y H:i') ?? 'Не отправлялось'),
                        Placeholder::make('abandoned_sent')
                            ->label('Telegram: не оплатил')
                            ->content(fn (?Order $record): string => $record?->telegram_abandoned_sent_at?->format('d.m.Y H:i') ?? 'Не отправлялось'),
                        Placeholder::make('payment_url')
                            ->label('Ссылка на оплату')
                            ->content(fn (?Order $record): string => $record?->prodamus_payment_url ?: 'Не сохранена')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('client.name')
                    ->label('Имя')
                    ->searchable(
                        query: fn (Builder $query, string $search): Builder => $query->whereHas(
                            'client',
                            fn (Builder $clientQuery) => $clientQuery->where('name', 'like', "%{$search}%")
                        )
                    ),

                TextColumn::make('client.telegram')
                    ->label('Telegram')
                    ->searchable(
                        query: fn (Builder $query, string $search): Builder => $query->whereHas(
                            'client',
                            fn (Builder $clientQuery) => $clientQuery->where('telegram', 'like', "%{$search}%")
                        )
                    )
                    ->toggleable(),

                TextColumn::make('client.email')
                    ->label('Email')
                    ->searchable(
                        query: fn (Builder $query, string $search): Builder => $query->whereHas(
                            'client',
                            fn (Builder $clientQuery) => $clientQuery->where('email', 'like', "%{$search}%")
                        )
                    )
                    ->toggleable(),

                TextColumn::make('phone')
                    ->label('Телефон')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('tariff')
                    ->label('Тариф')
                    ->formatStateUsing(fn (?string $state): string => static::formatTariff($state))
                    ->badge(),

                TextColumn::make('status')
                    ->label('Статус')
                    ->formatStateUsing(fn (?string $state): string => static::formatStatus($state))
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'paid' => 'success',
                        'abandoned' => 'danger',
                        default => 'warning',
                    }),

                TextColumn::make('created_at')
                    ->label('Создан')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),

                TextColumn::make('paid_at')
                    ->label('Оплачен')
                    ->dateTime('d.m.Y H:i')
                    ->sortable()
                    ->placeholder('—'),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Статус')
                    ->options([
                        'pending' => 'Перешёл к оплате',
                        'paid' => 'Оплачено',
                        'abandoned' => 'Не оплатил',
                    ]),
                SelectFilter::make('tariff')
                    ->label('Тариф')
                    ->options([
                        'standard' => 'Стандарт',
                        'vip' => 'VIP',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                ViewAction::make()
                    ->label('Просмотр')
                    ->modalWidth('5xl'),
            ])
            ->toolbarActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOrders::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with('client')->latest();
    }

    protected static function formatTariff(?string $tariff): string
    {
        return match ($tariff) {
            'standard' => 'Стандарт',
            'vip' => 'VIP',
            null, '' => 'Не указан',
            default => $tariff,
        };
    }

    protected static function formatStatus(?string $status): string
    {
        return match ($status) {
            'pending' => 'Перешёл к оплате',
            'paid' => 'Оплачено',
            'abandoned' => 'Не оплатил',
            null, '' => 'Не указан',
            default => $status,
        };
    }
}
