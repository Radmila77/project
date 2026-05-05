<?php

namespace App\Filament\Resources\Questionnaires;

use App\Filament\Resources\Questionnaires\Pages\ListQuestionnaires;
use App\Models\Questionnaire;
use BackedEnum;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class QuestionnaireResource extends Resource
{
    protected static ?string $model = Questionnaire::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static string|\UnitEnum|null $navigationGroup = 'Диагностика';

    protected static ?int $navigationSort = 3;

    protected static ?string $navigationLabel = 'Анкеты';

    protected static ?string $modelLabel = 'анкета';

    protected static ?string $pluralModelLabel = 'Анкеты';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Контакты')
                    ->schema([
                        TextInput::make('full_name')
                            ->label('Имя')
                            ->disabled(),
                        TextInput::make('telegram_link')
                            ->label('Telegram')
                            ->disabled(),
                    ])
                    ->columns(2),

                Section::make('Ответы анкеты')
                    ->schema([
                        Textarea::make('niche_and_expertise')
                            ->label('Ниша и экспертность')
                            ->rows(3)
                            ->disabled(),
                        Textarea::make('current_offer_and_check')
                            ->label('Текущий оффер и чек')
                            ->rows(3)
                            ->disabled(),
                        Textarea::make('social_platforms_and_sales')
                            ->label('Площадки и продажи')
                            ->rows(3)
                            ->disabled(),
                        TextInput::make('monthly_income')
                            ->label('Текущий доход в месяц')
                            ->disabled(),
                        TextInput::make('nearest_income_goal')
                            ->label('Ближайшая цель по доходу')
                            ->disabled(),
                        Textarea::make('income_barrier')
                            ->label('Что мешает выйти на следующий доход')
                            ->rows(3)
                            ->disabled(),
                        Textarea::make('desired_result')
                            ->label('Какой результат хочет получить')
                            ->rows(4)
                            ->disabled(),
                        Toggle::make('consent_personal_data')
                            ->label('Согласие на обработку персональных данных')
                            ->disabled(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_name')
                    ->label('Имя')
                    ->searchable(),

                TextColumn::make('telegram_link')
                    ->label('Telegram')
                    ->searchable(),

                TextColumn::make('monthly_income')
                    ->label('Доход')
                    ->toggleable(),

                TextColumn::make('nearest_income_goal')
                    ->label('Цель')
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->label('Дата')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
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
            'index' => ListQuestionnaires::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->latest();
    }
}
