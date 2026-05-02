import React from 'react';
import { motion } from "motion/react";
import AboutIcon from './AboutIcon.jsx';
import { trustPoints } from './aboutData.js';

const AboutEducationTrustSection = () => {
    return (
        <section className="relative z-10 px-4 py-10">
            <div className="container mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-12 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[38px] border border-black/6 bg-white/78 backdrop-blur-md p-8 md:p-9 shadow-[0_24px_60px_rgba(36,11,14,0.08)]"
                >
                    <div className="flex items-center gap-3 mb-5 text-custom-red">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-custom-red/10">
                            <AboutIcon type="education" />
                        </span>
                        <p className="text-sm font-exo font-bold uppercase tracking-[0.24em]">
                            Образование
                        </p>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-exo font-bold text-custom-bkred leading-[0.98] mb-5">
                        Экономическое образование, опора на аналитику и понимание бизнес-процессов.
                    </h2>

                    <p className="text-custom-gray font-roboto text-lg leading-relaxed">
                        Я получила высшее экономическое образование в Башкирском государственном университете.
                        Это дало мне фундамент в аналитике, управлении и понимании бизнес-процессов,
                        которые я сегодня использую в работе с клиентами и в построении стратегий продаж.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                >
                    <div className="flex items-center gap-3 mb-5 text-custom-red">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-custom-red/10">
                            <AboutIcon type="star" />
                        </span>
                        <p className="text-sm font-exo font-bold uppercase tracking-[0.24em]">
                            Почему мне доверяют
                        </p>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-exo font-bold text-custom-bkred leading-[0.96] mb-7 max-w-3xl">
                        За моей работой стоит не только опыт, но и повторяемая система, которая дает результат клиентам.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {trustPoints.map((item) => (
                            <div key={item} className="rounded-[26px] bg-white/78 border border-black/6 p-5 backdrop-blur-md shadow-[0_20px_50px_rgba(36,11,14,0.06)]">
                                <p className="text-custom-gray font-roboto leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutEducationTrustSection;
