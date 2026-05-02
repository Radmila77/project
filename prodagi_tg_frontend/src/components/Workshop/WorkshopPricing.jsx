import React, { useState } from 'react';
import WorkshopOrderModal from './WorkshopOrderModal.jsx';

const plans = [
    {
        tariff: 'standard',
        name: "Стандарт",
        label: "Базовый тариф",
        description: "Для тех, кто хочет спокойно внедрить систему продаж в своем темпе и собрать все ключевые инструменты внутри соцсети.",
        oldPrice: "6 000 ₽",
        price: "4 990 ₽",
        accent: "bg-white text-black border border-white/10",
        badge: "Самостоятельный формат",
        features: [
            "Полный доступ к практикуму сразу после оплаты",
            "Материалы остаются у вас навсегда",
            "Подходит для пошагового внедрения в удобном ритме"
        ],
        links: [
            {
                label: "Перейти к оплате",
                href: "#",
                style: "bg-custom-bkred text-white hover:bg-custom-red"
            }
        ]
    },
    {
        tariff: 'vip',
        name: "Выбор экспертов",
        label: "VIP тариф",
        description: "Расширенный формат для тех, кто хочет не просто пройти практикум, а ускорить результат и получить более персональное сопровождение.",
        oldPrice: "19 000 ₽",
        price: "15 490 ₽",
        accent: "bg-white text-black border-2 border-custom-red shadow-[0_20px_60px_rgba(120,15,23,0.18)]",
        badge: "VIP",
        features: [
            "Личный созвон со стратегией под вашу ситуацию",
            "Урок по продажам и готовые скрипты для коммуникации",
            "Возможность внутренней рассрочки"
        ],
        links: [
            {
                label: "Перейти к оплате",
                href: "#",
                style: "bg-custom-red text-white hover:bg-custom-bkred"
            },

        ],
        featured: true
    }
];

const WorkshopPricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <section className="relative overflow-hidden bg-custom-bkred px-4 py-20 md:py-24 text-white">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-custom-red blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <p className="mb-4 text-sm font-exo font-bold uppercase tracking-[0.24em] md:tracking-[0.32em] text-white/60">
                        Тарифы участия
                    </p>
                    <h2 className="mb-5 text-4xl font-exo font-bold uppercase leading-[0.95] md:text-5xl">
                        Выберите формат,
                        <span className="block text-custom-red mt-2">в котором вам удобно идти к результату</span>
                    </h2>
                    <p className="text-base md:text-lg font-roboto text-white/80 leading-relaxed">
                        Оба тарифа дают доступ к системе продаж в соцсетях. Разница только в глубине поддержки и скорости внедрения.
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl items-stretch gap-8 xl:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col justify-between rounded-[36px] p-6 md:p-8 xl:p-10 ${plan.accent}`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-8">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-custom-red mb-3">
                                            {plan.label}
                                        </p>
                                        <h3 className="text-3xl md:text-4xl font-exo font-bold uppercase text-custom-bkred">
                                            {plan.name}
                                        </h3>
                                    </div>

                                    <div className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] ${plan.featured ? 'bg-custom-red text-white' : 'bg-[#eef0ea] text-[#506246]'}`}>
                                        {plan.badge}
                                    </div>
                                </div>

                                <p className="text-custom-gray font-roboto leading-relaxed mb-8 text-base">
                                    {plan.description}
                                </p>

                                <div className="rounded-[28px] bg-custom-banner-gray/40 border border-black/5 p-6 mb-8">
                                    <p className="text-sm text-gray-400 line-through mb-2">{plan.oldPrice}</p>
                                    <p className="text-5xl md:text-6xl font-exo font-bold text-custom-bkred leading-none">
                                        {plan.price}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex gap-4 items-start">
                                            <span className={`mt-2 h-2.5 w-2.5 rounded-full shrink-0 ${plan.featured ? 'bg-custom-red' : 'bg-custom-bkred'}`}></span>
                                            <p className="text-custom-gray font-roboto leading-relaxed">
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                                <div className="space-y-3">
                                    {plan.links.map((link) => (
                                    <button
                                        key={link.label}
                                        type="button"
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`block w-full rounded-2xl py-4 px-6 text-center font-exo font-bold uppercase tracking-wide transition-all ${link.style}`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPlan ? (
                <WorkshopOrderModal
                    plan={selectedPlan}
                    onClose={() => setSelectedPlan(null)}
                />
            ) : null}
        </section>
    );
};

export default WorkshopPricing;
