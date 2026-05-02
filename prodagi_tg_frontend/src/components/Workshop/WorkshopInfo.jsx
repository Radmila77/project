import React from 'react';
import { motion } from "motion/react";
import SectionHeader from "../common/SectionHeader.jsx";

const painPoints = [
    "без навязчивых продаж",
    "без постоянного создания контента",
    "без сложных технических настроек"
];

const accessItems = [
    {
        title: "Доступ сразу после оплаты",
        description: "Вы можете начать внедрение без ожидания и сразу перейти к материалам."
    },
    {
        title: "Материалы остаются с вами навсегда",
        description: "К урокам можно возвращаться в любой момент, чтобы повторить результат и усилить его."
    }
];

const benefits = [
    "Настроенную систему продаж, благодаря которой канал в соцсетях сможет регулярно приносить от 100К в месяц и выше.",
    "Готовые воронки, которые автоматически прогревают аудиторию и подводят к покупке.",
    "Продающий контент по понятной структуре: вы сможете писать сильные посты по шаблонам, в том числе с помощью нейросетей.",
    "Готовые скрипты для переписок и созвонов, которые можно адаптировать под свою нишу и сразу использовать в работе.",
    "Простые способы привлечения клиентов, даже если сейчас у вас небольшая аудитория.",
    "Четкую стратегию масштабирования, чтобы расти в доходе без перегруза и хаоса."
];

const audience = [
    "Для экспертов в разных нишах, которые хотят выстроить стабильный доход через соцсети.",
    "Для тех, кто только начинает, и для тех, кто уже ведет канал, но хочет выйти на новый финансовый уровень и увеличить доход в два раза и больше."
];

const WorkshopInfo = () => {
    return (
        <section className="bg-custom-banner-gray/30 py-16 md:py-20">
            <SectionHeader title="ПРАКТИКУМ, КОТОРЫЙ СОБИРАЕТ ПРОДАЖИ В СИСТЕМУ" />

            <div className="container mx-auto px-4 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-[36px] bg-white shadow-sm border border-black/5"
                >
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="p-8 md:p-12">
                            <p className="text-xs font-bold uppercase tracking-[0.35em] text-custom-red mb-4">
                                Social Media Sales System
                            </p>
                            <h3 className="text-3xl md:text-5xl font-exo font-bold text-custom-bkred leading-tight mb-6">
                                Внедрите систему продаж в соцсетях и выйдите на стабильный доход от 100К в месяц и выше.
                            </h3>
                            <p className="text-lg md:text-xl text-custom-gray font-roboto leading-relaxed max-w-3xl">
                                Практикум помогает выстроить в соцсетях понятную и сильную систему, которая привлекает
                                платежеспособных клиентов, прогревает аудиторию и приводит к продажам без давления,
                                суеты и бесконечной гонки за охватами.
                            </p>
                        </div>

                        <div className="bg-custom-bkred px-8 py-10 md:px-10 text-white flex flex-col justify-center">
                            <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
                                Без чего
                            </p>
                            <div className="space-y-4">
                                {painPoints.map((item) => (
                                    <div key={item} className="border-b border-white/10 pb-4">
                                        <p className="font-roboto text-lg leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-black/5"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-custom-red mb-5">
                            Доступ
                        </p>
                        <div className="space-y-5">
                            {accessItems.map((item) => (
                                <div key={item.title} className="rounded-[24px] bg-custom-red/5 border border-custom-red/10 p-5">
                                    <h4 className="text-xl font-exo font-bold text-custom-bkred mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-custom-gray font-roboto leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-black/5"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-custom-red mb-5">
                            Что вы получите
                        </p>
                        <div className="grid gap-4">
                            {benefits.map((item, index) => (
                                <div
                                    key={item}
                                    className="grid grid-cols-[40px_1fr] gap-3 md:grid-cols-[44px_1fr] md:gap-4 items-start rounded-[22px] border border-black/5 bg-custom-banner-gray/40 p-4 md:p-5"
                                >
                                    <div className="h-11 w-11 rounded-full bg-custom-red text-white flex items-center justify-center font-exo font-bold text-sm">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <p className="text-custom-gray font-roboto leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-custom-red to-[#7d0f17] rounded-[36px] px-8 py-10 md:px-12 text-white shadow-sm"
                >
                    <div className="max-w-4xl">
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70 mb-4">
                            Результат
                        </p>
                        <h3 className="text-2xl md:text-4xl font-exo font-bold leading-tight mb-5">
                            Это не история про «попробовать». Это практикум для тех, кто хочет закрыть вопросы клиентов, продаж и чека в своей нише.
                        </h3>
                        <p className="text-white/90 font-roboto text-lg leading-relaxed">
                            Вы соберете систему, которая помогает понимать, где брать клиентов, как продавать дороже
                            и как делать это регулярно, а не от запуска к запуску.
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-black/5"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-custom-red mb-5">
                            Для кого этот практикум
                        </p>
                        <div className="space-y-4">
                            {audience.map((item) => (
                                <div key={item} className="flex gap-4 items-start">
                                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-custom-red shrink-0"></span>
                                    <p className="text-custom-gray font-roboto leading-relaxed text-lg">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="bg-custom-banner-gray p-8 md:p-10 rounded-[32px] border border-black/5 flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-custom-red mb-5">
                                Главная мысль
                            </p>
                            <h3 className="text-2xl md:text-3xl font-exo font-bold text-custom-bkred leading-tight mb-5">
                                Клиенты есть. Деньги в рынке есть. Вопрос только в том, будет ли у вас система, которая приводит их именно к вам.
                            </h3>
                            <p className="text-custom-gray font-roboto leading-relaxed">
                                Если вам нужен не хаотичный набор действий, а понятная модель регулярных продаж,
                                этот практикум поможет выстроить ее и закрепить на практике.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/10">
                            <p className="text-custom-bkred font-exo text-lg uppercase tracking-wide">
                                Решение для тех, кто выбирает результат, а не бесконечные попытки.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopInfo;
