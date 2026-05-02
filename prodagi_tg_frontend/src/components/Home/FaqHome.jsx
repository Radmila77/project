import React from 'react';
import SectionHeader from "../common/SectionHeader.jsx";

const FaqHome = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: "Как быстро я смогу окупить данный практикум?",
            answer: `Если ваш продукт стоит от 4000 ₽, этот курс окупится сразу после первой продажи.

А если ваш средний чек 10−30К, то этот курс — вообще «билет в новый уровень дохода».

Так зачем делать цену выше, если главная задача — помочь вам настроить систему, которая будет приносить деньги регулярно?`
        },
        {
            question: "Что будет после практикума?",
            answer: `Практикум — это не только теория, но и постоянная поддержка. Вы получаете доступ к чату для вопросов, где я буду отвечать на все ваши запросы.

Моя цель — чтобы вы не остались наедине с трудностями и всегда знали, что делать дальше. Мы вместе будем идти к результату!`
        },
        {
            question: "А вдруг у меня не получится?",
            answer: `Данный курс — не просто теория, а чёткий пошаговый план. Вы не будете сидеть и думать «что делать?» — у вас будет конкретная система:

- Настроили соцсети → привлекли клиентов.
- Запустили автоворонку → пошли заявки.
- Использовали готовые скрипты → закрыли продажи.

Главное — делать! Вам не нужно изобретать велосипед — всё уже протестировано на десятках учеников.`
        },
        {
            question: "Но у меня мало подписчиков...",
            answer: `Это не проблема!

В курсе есть методы продвижения, которые работают даже с 15 подписчиками. Вы научитесь привлекать клиентов без слива бюджета. Уже на первых модулях получите стратегию, как получать заявки даже без раскрученного канала.`
        },
        {
            question: "А вдруг это не подойдёт под мою нишу?",
            answer: `Курс подходит экспертам в разных нишах, которые хотят продавать в соцсетях.

Коучи, психологи, нутрициологи, наставники, специалисты в сфере услуг — уже применяют эту систему и зарабатывают. Внутри готовые шаблоны и стратегии, которые адаптируются под любую нишу.

Проверено лично мной и моими ученицами, часть кейсов и отзывы выше.`
        },
        {
            question: "Я не умею писать продающие посты...",
            answer: `И не нужно!

В курсе есть простые схемы, которые помогут писать прогревы и продающие посты за 10 минут, в том числе с помощью нейросетей. Плюс — получите готовые промты: просто вставляйте свой запрос и контент готов.`
        },
        {
            question: "Нет времени проходить практикум",
            answer: `Практикум не требует сидеть месяцами. Уже после первых уроков у вас будут первые результаты.

Бессрочный доступ — проходите в удобном темпе. Всё разбито на короткие, понятные шаги — достаточно 30 минут в день!`
        },
        {
            question: "Насколько дается доступ к модулям и урокам?",
            answer: `Доступ на курс бессрочный. Чтобы каждый мог двигаться в комфортном темпе и без стресса. В дальнейшем можно возвращаться к нужным урокам.`
        },
        {
            question: "Что, если мне будет тяжело? И я не смогу успевать за всеми?",
            answer: `Не переживайте! Курс разбит на короткие модули, каждый из которых вы осваиваете в удобном темпе. Я покажу, как делать всё легко и без перегрузки.

Пошаговые инструкции, чек-листы и готовые шаблоны — это всё, чтобы вам было проще внедрять материал.`
        },
        {
            question: "Почему цена практикума такая низкая?",
            answer: `Цель практикума — помочь вам выйти на стабильный доход, а не заработать на вас. Это специальная цена для первых участников. Я хочу, чтобы как можно больше экспертов смогли пройти курс и начать зарабатывать в соцсетях, не тратя при этом огромные суммы на обучение.

Но это предложение ограничено по времени — цена вырастет в ближайшее время, так что сейчас самое выгодное время для покупки!`
        }
    ];

    return (
        <section id="faq" className="bg-[#fffdfd] pb-14">
            <SectionHeader title="Вопросы и ответы"/>
            <div className="container mx-auto flex flex-col px-4 md:px-0 mb-10">
            {faqs.map((faq, index) => (
                <div
                    className={`mb-4 w-full cursor-pointer rounded-3xl border p-5 transition-all duration-300 ${
                        openIndex === index
                            ? "border-custom-red bg-white shadow-[0_16px_40px_rgba(80,1,2,0.08)]"
                            : "border-[#e8dede] bg-[#fcf8f8] hover:border-custom-red/40 hover:bg-white"
                    }`}
                    key={index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    <div className="flex items-center justify-between">
                        <h3 className={`pr-4 text-base md:text-lg font-semibold transition-colors ${
                            openIndex === index ? "text-custom-red" : "text-custom-bkred"
                        }`}>
                            {faq.question}
                        </h3>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            openIndex === index
                                ? "border-custom-red bg-custom-red text-white"
                                : "border-[#e2d6d6] bg-white text-custom-bkred"
                        }`}>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                            >
                                <path
                                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openIndex === index
                                ? "max-h-[500px] pt-4 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <p
                            className={`whitespace-pre-line rounded-2xl border-l-4 border-custom-red bg-custom-red/5 px-4 py-4 text-sm md:text-base leading-7 text-custom-gray transition-all duration-500 ease-in-out ${
                                openIndex === index ? "translate-y-0" : "-translate-y-2"
                            }`}
                        >
                            {faq.answer}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        </section>
    );
};

export default FaqHome;
