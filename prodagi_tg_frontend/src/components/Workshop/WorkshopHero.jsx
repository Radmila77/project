import React from 'react';
import { motion } from "motion/react";

const WorkshopHero = () => {
    return (
        <section className="relative z-10 px-4 pt-6 md:pt-8">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <div className="mb-5 inline-flex items-center rounded-full border border-custom-red/15 bg-custom-red/6 px-4 py-2">
                        <span className="text-xs md:text-sm font-exo font-bold uppercase tracking-[0.28em] text-custom-red">
                            Практикум
                        </span>
                    </div>

                    <h1 className="text-4xl font-exo font-bold uppercase tracking-[-0.03em] text-custom-bkred leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                        Система продаж
                        <span className="block text-custom-red mt-2">
                            в соцсетях
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto mt-6 text-base md:text-xl font-roboto leading-relaxed text-custom-gray">
                        Четкая модель, которая помогает привлекать сильных клиентов, выстраивать доверие
                        и переводить внимание аудитории в стабильные продажи.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkshopHero;
