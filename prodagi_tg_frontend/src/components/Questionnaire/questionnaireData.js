export const questionnaireIntro = {
    badge: 'Анкета',
    title: 'Анкета для чек-апа продаж',
    description: 'Ответьте на несколько вопросов, чтобы я увидела вашу текущую точку, ограничения и желаемый результат.',
};

export const questionnaireSections = [
    {
        id: 'contacts',
        title: 'Контакты и позиционирование',
        description: 'Этот блок помогает понять, кто вы, в какой нише работаете и что уже продаёте сейчас.',
        fields: [
            {
                name: 'full_name',
                label: 'Ваше Имя и Фамилия',
                type: 'text',
                placeholder: 'Введите имя и фамилию',
                required: true
            },
            {
                name: 'telegram_link',
                label: 'Никнейм в Телеграм для связи',
                type: 'text',
                placeholder: '@username',
                required: true
            },
            {
                name: 'niche_and_expertise',
                label: 'В какой нише развиваешься? В чем ты эксперт?',
                type: 'textarea',
                placeholder: 'Опишите вашу нишу и экспертность',
                required: true
            },
            {
                name: 'current_offer_and_check',
                label: 'Что сейчас продаешь и за какой чек?',
                type: 'textarea',
                placeholder: 'Опишите текущие продукты, услуги и средний чек',
                required: true
            }
        ]
    },
    {
        id: 'current_state',
        title: 'Текущая ситуация',
        description: 'Здесь уже видны ваши каналы продвижения, текущий уровень дохода и ближайшая финансовая цель.',
        fields: [
            {
                name: 'social_platforms_and_sales',
                label: 'Какие соц сети ведешь, где продвигаешь свои услуги? И были ли уже продажи с них?',
                type: 'textarea',
                placeholder: 'Перечислите соцсети и коротко опишите, были ли продажи',
                required: true
            },
            {
                name: 'monthly_income',
                label: 'Какой сейчас у тебя доход в месяц?',
                type: 'radio',
                required: true,
                options: [
                    'до 50 тыс. руб',
                    'от 50 до 100 тыс. руб',
                    'от 100 до 200 тыс. руб',
                    'от 200 до 300 тыс. руб',
                    'Более 300 тыс. руб'
                ]
            },
            {
                name: 'nearest_income_goal',
                label: 'Твоя ближайшая цель по доходу?',
                type: 'text',
                placeholder: 'Например, 200 000 рублей в месяц',
                required: true
            }
        ]
    },
    {
        id: 'request',
        title: 'Запрос и желаемый результат',
        description: 'Финальный блок помогает понять, что сейчас мешает росту и какого результата вы ждёте от чек-апа продаж.',
        fields: [
            {
                name: 'income_barrier',
                label: 'Как думаешь, что мешает прийти к желаемому доходу?',
                type: 'radio',
                required: true,
                options: [
                    'Не хватает трафика',
                    'Не знаю или трудно донести ценность своего продукта',
                    'Не могу выстроить воронки продаж, а те которые есть заявок не приносят',
                    'Низкие конверсии в продажу на консультации',
                    'Не знаю как выстроить прогрев в блоге, трудности с контентом',
                    'Неуверенность и страхи',
                    'Нет продуктовой линейки, только разовые консультации',
                    'Другое'
                ]
            },
            {
                name: 'desired_result',
                label: 'Как результат хочешь получить с чек-ап продаж?',
                type: 'textarea',
                placeholder: 'Опишите, к какому результату хотите прийти',
                required: true
            }
        ]
    }
];

export const questionnaireMetaFields = [
    {
        name: 'consent_personal_data',
        label: 'Я согласен(а) на обработку персональных данных',
        type: 'checkbox',
        required: true
    }
];
