<?php

namespace App\Filament\Resources\Quizzes;

use App\Filament\Resources\Quizzes\Pages\ListQuizzes;
use App\Models\Quiz;
use BackedEnum;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\HtmlString;

class QuizResource extends Resource
{
    protected static ?string $model = Quiz::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentList;

    protected static string|\UnitEnum|null $navigationGroup = 'Диагностика';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Квизы';

    protected static ?string $modelLabel = 'квиз';

    protected static ?string $pluralModelLabel = 'Квизы';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Контакт')
                    ->schema([
                        Placeholder::make('client_name')
                            ->label('Имя')
                            ->content(fn (?Quiz $record): string => $record?->client?->name ?? 'Не указано'),
                        Placeholder::make('client_telegram')
                            ->label('Telegram')
                            ->content(fn (?Quiz $record): string => $record?->client?->telegram ?? 'Не указан'),
                        Placeholder::make('result_key')
                            ->label('Результат квиза')
                            ->content(fn (?Quiz $record): string => static::formatResultKey($record?->result_key)),
                        Toggle::make('consent')
                            ->label('Согласие на обработку персональных данных')
                            ->disabled(),
                    ])
                    ->columns(2),

                Section::make('Ответы пользователя')
                    ->schema([
                        Placeholder::make('quiz_answers_preview')
                            ->hiddenLabel()
                            ->content(fn (?Quiz $record): HtmlString => new HtmlString(nl2br(e(static::formatQuizAnswers($record?->quiz_answers ?? [])))))
                            ->columnSpanFull(),
                    ]),
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
                    ),

                TextColumn::make('result_key')
                    ->label('Результат')
                    ->formatStateUsing(fn (?string $state): string => static::formatResultKey($state))
                    ->badge(),

                TextColumn::make('created_at')
                    ->label('Дата')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                ViewAction::make()
                    ->label('Просмотр')
                    ->modalWidth('4xl'),
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
            'index' => ListQuizzes::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with('client')->latest();
    }

    protected static function formatResultKey(?string $resultKey): string
    {
        return match ($resultKey) {
            'chaos' => 'Телега-хаос',
            'holes' => 'Система с дырками',
            'machine' => 'Телега-машина',
            null, '' => 'Результат ещё не сохранён',
            default => $resultKey,
        };
    }

    protected static function formatQuizAnswers(array $answers): string
    {
        if ($answers === []) {
            return 'Пользователь ещё не завершил квиз.';
        }

        return collect($answers)
            ->map(function (array $answer, int $index): string {
                $question = $answer['questionPrompt'] ?? $answer['questionTitle'] ?? "Вопрос " . ($index + 1);
                $selected = $answer['optionLabel'] ?? 'Ответ не найден';

                return ($index + 1) . ". {$question}\nОтвет: {$selected}";
            })
            ->implode("\n\n");
    }
}
