import React from 'react';
import { motion } from "motion/react";
import SectionHeader from "../common/SectionHeader.jsx";

const program = [
    {
        step: "01",
        title: "Предобучение",
        subtitle: "Открывается сразу после оплаты",
        summary: "Мышление в продажах, позиционирование в соцсетях и техническая база для уверенного старта.",
        result: "Выстраиваете спокойное отношение к продажам и понимаете, как презентовать услуги так, чтобы аудитория была готова покупать."
    },
    {
        step: "02",
        title: "Продающая упаковка канала",
        summary: "Упаковка канала, встроенные воронки и структура, которая работает даже без постоянного контента.",
        result: "Канал начинает сильнее привлекать внимание и превращать подписчиков во входящие заявки."
    },
    {
        step: "03",
        title: "Продуктовая линейка",
        summary: "Логика предложений, переход клиента между продуктами и настройка системы, в которой каждый продукт усиливает следующий.",
        result: "Вы зарабатываете больше с одного клиента и собираете модель роста без хаоса и перегруза."
    },
    {
        step: "04",
        title: "Продающий контент и смыслы",
        summary: "Темы для контента, смысловая распаковка, быстрые прогревы, сильные офферы и работа с нейросетями.",
        result: "Контент начинает вести к диалогу и покупке, а не просто заполнять ленту ради активности."
    },
    {
        step: "05",
        title: "Трафик, воронки и обработка заявок",
        summary: "Бюджетные способы продвижения, рабочие воронки и логика переписки, которая помогает не терять заявки.",
        result: "Вы привлекаете более целевую аудиторию и увереннее закрываете входящие обращения в продажу."
    }
];

const outcomes = [
    "Соцсети становятся стабильным инструментом продаж, а не площадкой для бесконечных попыток.",
    "Появляется понятный поток входящих заявок вместо зависимости от случайных рекомендаций.",
    "Диалоги в личке начинают работать на продажу за счет структуры, а не интуиции.",
    "Вы внедряете систему, которая помогает выйти на стабильный доход от 200К в месяц без сложных схем и выгорания."
];

const BackgroundVector = () => (
    <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M112 166C278 90 466 96 617 179C761 258 862 406 1016 467C1138 515 1274 503 1386 586"
            stroke="rgba(125,15,23,0.12)"
            strokeWidth="2"
        />
        <path
            d="M-23 869C132 729 358 695 546 758C704 811 813 930 972 979C1112 1023 1269 999 1457 905"
            stroke="rgba(125,15,23,0.10)"
            strokeWidth="2"
        />
        <circle cx="1168" cy="152" r="180" fill="url(#paint0_radial)" />
        <circle cx="239" cy="1008" r="220" fill="url(#paint1_radial)" />
        <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1168 152) rotate(90) scale(180)">
                <stop stopColor="#8B1822" stopOpacity="0.16" />
                <stop offset="1" stopColor="#8B1822" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(239 1008) rotate(90) scale(220)">
                <stop stopColor="#220B0E" stopOpacity="0.10" />
                <stop offset="1" stopColor="#220B0E" stopOpacity="0" />
            </radialGradient>
        </defs>
    </svg>
);

const WorkshopModules = () => {
    return (
        <section className="relative overflow-hidden bg-[#f5f1ed] py-16 md:py-20">
            <BackgroundVector />

            <div className="relative z-10">
                <SectionHeader title="ПРОГРАММА И РЕЗУЛЬТАТ ПРАКТИКУМА" />

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mb-14"
                    >
                        <p className="mb-4 text-sm font-exo font-bold uppercase tracking-[0.22em] md:tracking-[0.3em] text-custom-red">
                            Программа практикума
                        </p>
                        <h2 className="text-3xl md:text-5xl font-exo font-bold text-custom-bkred leading-[0.98] mb-5">
                            Пять опорных этапов, из которых собирается сильная система продаж в соцсетях.
                        </h2>
                        <p className="text-lg text-custom-gray font-roboto leading-relaxed max-w-3xl">
                            Коротко, по делу и с фокусом на внедрение. Каждый блок ведет к конкретному результату,
                            чтобы страница не утомляла, а сразу давала ясную картину.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
                        <div className="relative">
                            <div className="absolute left-[26px] top-2 bottom-2 hidden md:block w-px bg-gradient-to-b from-custom-red/40 via-custom-red/20 to-transparent"></div>

                            <div className="space-y-10">
                                {program.map((item, index) => (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, x: -24 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative md:pl-20"
                                    >
                                        <div className="absolute left-0 top-1 hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-custom-red/20 bg-white text-custom-red font-exo font-bold text-lg shadow-sm">
                                            {item.step}
                                        </div>

                                        <div className="md:hidden flex items-center gap-4 mb-4">
                                            <div className="h-12 w-12 rounded-full border border-custom-red/20 bg-white text-custom-red flex items-center justify-center font-exo font-bold text-base shadow-sm">
                                                {item.step}
                                            </div>
                                            <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-custom-red">
                                                Модуль
                                            </p>
                                        </div>

                                        <div className="border-b border-black/10 pb-8">
                                            <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-3">
                                                <h3 className="text-2xl md:text-3xl font-exo font-bold text-custom-bkred uppercase leading-tight">
                                                    {item.title}
                                                </h3>
                                                {item.subtitle && (
                                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-custom-red">
                                                        {item.subtitle}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-custom-gray font-roboto text-lg leading-relaxed max-w-2xl mb-4">
                                                {item.summary}
                                            </p>

                                            <p className="font-roboto text-custom-bkred leading-relaxed max-w-2xl">
                                                <span className="font-exo font-bold uppercase text-sm tracking-[0.18em] text-custom-red mr-3">
                                                    Результат
                                                </span>
                                                {item.result}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-24"
                        >
                            <div className="relative overflow-hidden rounded-[36px] bg-custom-bkred p-8 md:p-10 text-white shadow-[0_30px_80px_rgba(36,11,14,0.18)]">
                                <svg
                                    className="absolute -right-12 -top-10 h-56 w-56 opacity-20"
                                    viewBox="0 0 220 220"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M18 124C52 66 124 24 192 30" stroke="white" strokeWidth="1.5" />
                                    <path d="M34 170C77 110 144 88 210 98" stroke="white" strokeWidth="1.5" />
                                    <circle cx="87" cy="92" r="64" stroke="white" strokeOpacity="0.35" />
                                </svg>

                                <p className="relative text-sm font-exo font-bold uppercase tracking-[0.3em] text-white/60 mb-4">
                                    Результат практикума
                                </p>
                                <h3 className="relative text-2xl md:text-4xl font-exo font-bold leading-[1.02] mb-5">
                                    Не просто знания, а система, которую можно внедрить и повторять регулярно.
                                </h3>
                                <p className="relative text-white/80 font-roboto text-lg leading-relaxed mb-8">
                                    После прохождения у вас остается не разовый всплеск активности, а понятная логика:
                                    как привлекать внимание, как прогревать аудиторию и как переводить заявки в деньги.
                                </p>

                                <div className="relative space-y-5">
                                    {outcomes.map((item) => (
                                        <div key={item} className="flex gap-4">
                                            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-white shrink-0"></span>
                                            <p className="font-roboto leading-relaxed text-white/92">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative mt-10 pt-6 border-t border-white/10">
                                    <p className="font-exo text-lg uppercase tracking-[0.18em] text-white/90">
                                        Система, к которой можно возвращаться и усиливать результат снова.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopModules;
