<?php

namespace App\Filament\Widgets;

use App\Models\Questionnaire;
use App\Models\Quiz;
use App\Models\Review;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AdminOverviewWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 2;

    protected ?string $heading = 'Сводка по заявкам и контенту';

    protected ?string $description = 'Здесь вы быстро видите, что требует внимания в первую очередь.';

    protected function getStats(): array
    {
        return [
            Stat::make('Отзывы на модерации', Review::query()->where('publication_status', 'pending')->count())
                ->description('Новые отзывы, которые ещё не опубликованы')
                ->descriptionIcon(Heroicon::OutlinedChatBubbleBottomCenterText)
                ->color('warning'),

            Stat::make('Пройдено квизов', Quiz::query()->count())
                ->description('Ответы пользователей для просмотра')
                ->descriptionIcon(Heroicon::OutlinedClipboardDocumentList)
                ->color('primary'),

            Stat::make('Получено анкет', Questionnaire::query()->count())
                ->description('Новые анкеты и брифы клиентов')
                ->descriptionIcon(Heroicon::OutlinedDocumentText)
                ->color('success'),
        ];
    }
}
