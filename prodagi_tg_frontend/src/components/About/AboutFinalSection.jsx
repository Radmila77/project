import React from 'react';
import { motion } from "motion/react";

const AboutFinalSection = () => {
    return (
        <section className="relative z-10 px-4 pt-10 pb-20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[42px] bg-custom-bkred text-white p-8 md:p-10 overflow-hidden relative"
                >
                    <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/6 to-transparent"></div>
                    <div className="relative max-w-4xl">
                        <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-white/60 mb-4">
                            Мой подход
                        </p>
                        <h2 className="text-3xl md:text-5xl font-exo font-bold leading-[0.96] mb-6">
                            Моя задача — не просто научить отдельным инструментам, а собрать для вас систему продаж, которая работает в реальной жизни.
                        </h2>
                        <p className="text-white/82 font-roboto text-lg leading-relaxed mb-6">
                            Если вы устали от хаоса, расфокуса и разрозненных действий, я помогу выстроить путь,
                            в котором есть оффер, воронка, стабильные заявки и понятная финансовая логика.
                        </p>
                        <p className="text-white/92 font-exo text-lg uppercase tracking-[0.18em]">
                            Когда продажи становятся системой, бизнес начинает дышать спокойнее.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutFinalSection;
