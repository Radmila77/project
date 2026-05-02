import React from 'react';
import { motion } from 'motion/react';
import { questionnaireIntro } from './questionnaireData.js';

const QuestionnaireHero = () => {
    return (
        <section className="relative px-4 pt-10 pb-8">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl"
                >
                    <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-custom-red">
                        {questionnaireIntro.badge}
                    </p>

                    <h1 className="mt-5 text-4xl font-exo font-bold leading-[0.94] text-custom-bkred md:text-6xl">
                        {questionnaireIntro.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-custom-gray">
                        {questionnaireIntro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default QuestionnaireHero;
