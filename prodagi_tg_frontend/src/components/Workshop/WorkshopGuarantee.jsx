import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "motion/react";

const guaranteeCards = [
    {
        id: "refund",
        eyebrow: "Условия возврата",
        title: "10 дней на спокойное решение",
        description: "Если практикум не оправдает ожидания, вы можете оформить возврат в течение 10 дней с момента оплаты без объяснения причин.",
        points: [
            "Честные и прозрачные условия без скрытых ограничений.",
            "Решение о покупке можно принимать без внутреннего давления."
        ],
        icon: "shield"
    },
    {
        id: "access",
        eyebrow: "Бессрочный доступ",
        title: "Материалы остаются с вами навсегда",
        description: "Вы можете возвращаться к урокам в любой момент, пересматривать ключевые блоки и усиливать результат тогда, когда это нужно вам.",
        points: [
            "Удобно для повторного прохождения и закрепления системы.",
            "Практикум продолжает работать на вас и после завершения."
        ],
        icon: "infinity"
    },
    {
        id: "confidence",
        eyebrow: "Спокойный старт",
        title: "Вход в практикум без ощущения риска",
        description: "Гарантия позволяет заходить в обучение с более уверенным ощущением: вы понимаете, что у вас есть и доступ, и защита вашего решения.",
        points: [
            "Проще сосредоточиться на результате, а не на сомнениях.",
            "Фокус смещается на внедрение, а не на внутреннее напряжение."
        ],
        icon: "time"
    }
];

const GuaranteeIcon = ({ type, className = "h-5 w-5" }) => {
    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className
    };

    if (type === "shield") {
        return (
            <svg {...commonProps}>
                <path d="M12 3L19 6V11C19 15.4183 16.134 19.223 12 20.5C7.866 19.223 5 15.4183 5 11V6L12 3Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M9 12.2L11 14.2L15.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === "infinity") {
        return (
            <svg {...commonProps}>
                <path d="M7.5 14.5C5.29086 14.5 3.5 12.7091 3.5 10.5C3.5 8.29086 5.29086 6.5 7.5 6.5C10.5 6.5 13.5 14.5 16.5 14.5C18.7091 14.5 20.5 12.7091 20.5 10.5C20.5 8.29086 18.7091 6.5 16.5 6.5C13.5 6.5 10.5 14.5 7.5 14.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg {...commonProps}>
            <path d="M12 7V12L15.5 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    );
};

GuaranteeIcon.propTypes = {
    type: PropTypes.oneOf(['shield', 'infinity', 'time']).isRequired,
    className: PropTypes.string
};

const WorkshopGuarantee = () => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <section className="relative overflow-hidden bg-[#f5f1ed] py-16 md:py-20">
            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="relative pt-10 pb-8">
                        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-custom-red/25 to-transparent"></div>
                        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-custom-red/18 to-transparent"></div>

                        <div className="grid lg:grid-cols-[1fr_0.96fr] gap-14 lg:gap-16 items-start">
                            <div className="max-w-2xl relative z-10">
                                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-custom-red/15 bg-white/80 px-4 py-2 text-sm font-exo font-bold uppercase tracking-[0.18em] md:tracking-[0.24em] text-custom-red">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-custom-red"></span>
                                    Гарантия результата
                                </p>

                                <h2 className="text-3xl md:text-5xl font-exo font-bold text-custom-bkred leading-[0.95] mb-7">
                                    Спокойный вход в практикум
                                    <span className="block text-custom-red mt-2">с понятными условиями и без лишнего риска</span>
                                </h2>

                                <div className="space-y-6 text-lg text-custom-gray font-roboto leading-relaxed">
                                    <p>
                                        Когда я создаю практикум, для меня важно не просто передать знания,
                                        а помочь каждому участнику прийти к реальным и ощутимым результатам.
                                    </p>
                                    <p>
                                        Поэтому я даю честную гарантию: если вы идете по пошаговой системе и внедряете материалы,
                                        результат не заставит себя ждать.
                                    </p>
                                    <p>
                                        Если по каким-то причинам практикум не оправдает ожидания,
                                        в течение 10 дней с момента оплаты я готова вернуть деньги без объяснения причин.
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6 flex flex-wrap items-center gap-3">
                                    {guaranteeCards.map((card, index) => (
                                        <button
                                            key={card.id}
                                            type="button"
                                            onMouseEnter={() => setActiveCard(index)}
                                            onFocus={() => setActiveCard(index)}
                                            onClick={() => setActiveCard(index)}
                                            className={`group inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-exo font-bold uppercase tracking-[0.16em] md:px-4 md:text-xs md:tracking-[0.2em] transition-all ${
                                                activeCard === index
                                                    ? 'bg-custom-bkred text-white shadow-lg'
                                                    : 'bg-white/80 text-custom-red border border-custom-red/12 hover:bg-white'
                                            }`}
                                        >
                                            <GuaranteeIcon type={card.icon} className="h-4 w-4" />
                                            <span className="whitespace-nowrap">{card.eyebrow}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="lg:hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={guaranteeCards[activeCard].id}
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.22 }}
                                            className="rounded-[28px] border border-custom-bkred/5 bg-custom-bkred text-white shadow-[0_30px_80px_rgba(36,11,14,0.14)]"
                                        >
                                            <div className="p-5 sm:p-6">
                                                <div className="mb-5 flex items-start justify-between gap-5">
                                                    <div>
                                                        <p className="mb-3 text-xs font-exo font-bold uppercase tracking-[0.22em] text-white/55">
                                                            {guaranteeCards[activeCard].eyebrow}
                                                        </p>
                                                        <h3 className="max-w-md text-2xl font-exo font-bold leading-[1.02] text-white sm:text-3xl">
                                                            {guaranteeCards[activeCard].title}
                                                        </h3>
                                                    </div>

                                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                                                        <GuaranteeIcon type={guaranteeCards[activeCard].icon} />
                                                    </span>
                                                </div>

                                                <p className="mb-7 max-w-lg font-roboto text-base leading-relaxed text-white/82 sm:text-lg">
                                                    {guaranteeCards[activeCard].description}
                                                </p>

                                                <div className="space-y-4">
                                                    {guaranteeCards[activeCard].points.map((point) => (
                                                        <div key={point} className="flex items-start gap-3">
                                                            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-white"></span>
                                                            <p className="font-roboto leading-relaxed text-white/92">
                                                                {point}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div
                                    className="relative hidden h-[500px] xl:h-[450px] lg:block"
                                    onMouseLeave={() => setActiveCard(0)}
                                >
                                    {guaranteeCards.map((card, index) => {
                                        const offset = index - activeCard;
                                        const isActive = index === activeCard;

                                        return (
                                            <motion.div
                                                key={card.id}
                                                initial={false}
                                                animate={{
                                                    y: offset * 18,
                                                    x: Math.abs(offset) * 8,
                                                    scale: isActive ? 1 : 0.96 - Math.min(Math.abs(offset), 2) * 0.02,
                                                    rotate: offset * 1.2,
                                                    opacity: isActive ? 1 : 0.58,
                                                    zIndex: 30 - Math.abs(offset)
                                                }}
                                                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                                                className={`absolute left-0 right-0 top-0 origin-top rounded-[34px] border ${
                                                    isActive
                                                        ? 'border-custom-bkred/5 bg-custom-bkred text-white shadow-[0_30px_80px_rgba(36,11,14,0.18)]'
                                                        : 'border-white/70 bg-white/84 text-custom-bkred shadow-[0_20px_50px_rgba(36,11,14,0.06)] backdrop-blur-md'
                                                }`}
                                            >
                                                <div className="p-6 md:p-7">
                                                    <div className="flex items-start justify-between gap-5 mb-6">
                                                        <div>
                                                            <p className={`text-xs font-exo font-bold uppercase tracking-[0.22em] mb-3 ${
                                                                isActive ? 'text-white/55' : 'text-custom-red'
                                                            }`}>
                                                                {card.eyebrow}
                                                            </p>
                                                            <h3 className={`text-2xl md:text-3xl font-exo font-bold leading-[1.02] max-w-md ${
                                                                isActive ? 'text-white' : 'text-custom-bkred'
                                                            }`}>
                                                                {card.title}
                                                            </h3>
                                                        </div>

                                                        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                                                            isActive
                                                                ? 'bg-white/10 text-white'
                                                                : 'bg-custom-red/10 text-custom-red'
                                                        }`}>
                                                            <GuaranteeIcon type={card.icon} />
                                                        </span>
                                                    </div>

                                                    <p className={`text-base md:text-lg font-roboto leading-relaxed max-w-lg mb-7 ${
                                                        isActive ? 'text-white/82' : 'text-custom-gray'
                                                    }`}>
                                                        {card.description}
                                                    </p>

                                                    <div className="space-y-4">
                                                        {card.points.map((point) => (
                                                            <div key={point} className="flex items-start gap-3">
                                                                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${
                                                                    isActive ? 'bg-white' : 'bg-custom-red'
                                                                }`}></span>
                                                                <p className={`font-roboto leading-relaxed ${
                                                                    isActive ? 'text-white/92' : 'text-custom-gray'
                                                                }`}>
                                                                    {point}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <AnimatePresence mode="wait">
                                                        {isActive && (
                                                            <motion.div
                                                                key={card.id}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -8 }}
                                                                transition={{ duration: 0.22 }}
                                                                className="mt-8 pt-5 border-t border-white/10"
                                                            >
                                                                <div className="flex items-center justify-between gap-5">
                                                                    <p className="font-exo text-sm uppercase tracking-[0.18em] text-white/90">
                                                                        Наведите на метки выше, чтобы открыть следующую карточку
                                                                    </p>
                                                                    <div className="flex gap-2">
                                                                        {guaranteeCards.map((_, dotIndex) => (
                                                                            <span
                                                                                key={dotIndex}
                                                                                className={`h-2.5 w-2.5 rounded-full ${
                                                                                    dotIndex === activeCard ? 'bg-white' : 'bg-white/20'
                                                                                }`}
                                                                            ></span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkshopGuarantee;
