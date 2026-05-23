import React, { useState } from 'react';
import { motion } from "motion/react";
import AboutIcon from './AboutIcon.jsx';
import { cases } from './aboutData.js';

const AboutCasesSection = () => {
    const [activeCase, setActiveCase] = useState(0);

    const showPrevCase = () => {
        setActiveCase((current) => (current - 1 + cases.length) % cases.length);
    };

    const showNextCase = () => {
        setActiveCase((current) => (current + 1) % cases.length);
    };

    return (
        <section className="relative z-10 px-4 py-10">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[42px] bg-custom-bkred p-6 text-white md:p-10"
                >
                    <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/6 blur-3xl"></div>
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                                <AboutIcon type="case" />
                            </span>
                            <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-white/60">
                                Мои кейсы
                            </p>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-exo font-bold leading-[0.96] mb-8 max-w-4xl">
                            Результаты приходят в разных нишах, потому что система строится не на случайности, а на стратегии.
                        </h2>

                        <div className="relative mt-2">
                            <div className="hidden md:block absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/16 to-transparent"></div>

                            <div className="relative h-[360px] overflow-hidden sm:h-[340px] md:h-[340px]">
                                {cases.map((item, index) => {
                                    const rawOffset = index - activeCase;
                                    const wrappedOffset =
                                        rawOffset > cases.length / 2
                                            ? rawOffset - cases.length
                                            : rawOffset < -cases.length / 2
                                                ? rawOffset + cases.length
                                                : rawOffset;
                                    const isActive = wrappedOffset === 0;
                                    const distance = Math.abs(wrappedOffset);
                                    const isNeighbor = distance === 1;

                                    let xPosition = 0;

                                    if (wrappedOffset === -1) {
                                        xPosition = '-96%';
                                    } else if (wrappedOffset === 1) {
                                        xPosition = '96%';
                                    } else if (wrappedOffset < -1) {
                                        xPosition = '-165%';
                                    } else if (wrappedOffset > 1) {
                                        xPosition = '165%';
                                    }

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={false}
                                            animate={{
                                                x: xPosition,
                                                scale: isActive ? 1 : isNeighbor ? 0.9 : 0.82,
                                                opacity: isActive ? 1 : isNeighbor ? 0.2 : 0,
                                                zIndex: isActive ? 30 : isNeighbor ? 20 : 10
                                            }}
                                            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                                            className="absolute left-1/2 top-5 w-[92%] sm:w-[82%] md:w-[52%] -translate-x-1/2"
                                            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                                        >
                                            <div
                                                className={`rounded-[32px] border p-6 md:p-7 transition-all ${
                                                    isActive
                                                        ? 'border-white/10 bg-white'
                                                        : 'border-white/8 bg-white/6'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-5 mb-5">
                                                    <div>
                                                        <p className={`text-2xl font-exo font-bold mb-2 ${
                                                            isActive ? 'text-custom-bkred' : 'text-white/78'
                                                        }`}>
                                                            {item.name}
                                                        </p>
                                                        <p className={`font-roboto ${
                                                            isActive ? 'text-custom-gray' : 'text-white/46'
                                                        }`}>
                                                            {item.role}
                                                        </p>
                                                    </div>
                                                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                                                        isActive ? 'bg-custom-bkred text-white' : 'bg-white/8 text-white/55'
                                                    }`}>
                                                        <AboutIcon type="growth" className="h-5 w-5" />
                                                    </span>
                                                </div>

                                                <p className={`font-roboto leading-relaxed text-lg ${
                                                    isActive ? 'text-custom-red' : 'text-white/62'
                                                }`}>
                                                    {item.result}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={showPrevCase}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition-all hover:bg-white hover:text-custom-bkred"
                                    aria-label="Предыдущий кейс"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                <div className="flex gap-2">
                                    {cases.map((item, index) => (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() => setActiveCase(index)}
                                            className={`h-2.5 rounded-full transition-all ${
                                                index === activeCase ? 'w-8 bg-white' : 'w-2.5 bg-white/22'
                                            }`}
                                            aria-label={`Показать кейс ${item.name}`}
                                        ></button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={showNextCase}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition-all hover:bg-white hover:text-custom-bkred"
                                    aria-label="Следующий кейс"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p className="text-white/74 font-roboto text-lg leading-relaxed mt-8 max-w-4xl">
                            Это лишь часть кейсов. У меня есть результаты в разных нишах: от наставников и психологов
                            до дизайнеров и специалистов по инфографике.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutCasesSection;
