import React from 'react';
import { motion } from "motion/react";
import MeImage from 'src/assets/aboutme.jpg';

const AboutHeroSection = () => {
    return (
        <section className="relative z-10 px-4 pt-10 pb-16">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-[1.04fr_0.96fr] gap-14 items-center"
                >

                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 rounded-full border border-custom-red/15 bg-white/80 px-4 py-2 text-sm font-exo font-bold uppercase tracking-[0.24em] text-custom-red mb-5">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-custom-red"></span>
                            Обо мне
                        </p>

                        <h1 className="text-4xl md:text-6xl font-exo font-bold text-custom-bkred leading-[0.94] mb-7">
                            Строю системы продаж,
                            <span className="block text-custom-red mt-2">которые приводят к деньгам, а не к хаосу</span>
                        </h1>

                        <div className="space-y-6 text-lg text-custom-gray font-roboto leading-relaxed">
                            <p>
                                Я знаю, каково это — вкладывать силы и время, но не получать отдачи.
                                Поэтому моя задача не просто рассказать про трафик или контент,
                                а собрать для клиента систему: от оффера и воронки до стабильных заявок и предсказуемого дохода.
                            </p>
                            <p>
                                Если вы устали от хаоса и расфокуса и хотите, чтобы продажи в соцсетях
                                наконец стали системными и понятными, я помогу пройти этот путь спокойнее и сильнее.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex min-h-[360px] flex-col items-center gap-6 pt-2 sm:min-h-[420px] lg:min-h-[460px] lg:justify-end">
                        <div className="h-[300px] w-full max-w-[280px] overflow-hidden rounded-[32px] sm:h-[360px] sm:max-w-[320px]">
                            <img src={MeImage} alt="Фото about" className="w-full h-full object-cover"/>
                        </div>


                        <div className="relative z-20 w-full max-w-[260px] rounded-[32px] bg-custom-bkred p-5 text-white shadow-[0_28px_80px_rgba(125,15,23,0.18)] sm:max-w-[280px] sm:p-6 lg:absolute lg:bottom-0 lg:left-0 lg:translate-x-0 2xl:-left-8 2xl:-bottom-6">
                            <p className="text-xs font-exo font-bold uppercase tracking-[0.22em] text-white/55 mb-4">
                                Почему мне доверяют
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-white/8 p-3 text-center">
                                    <p className="text-2xl font-exo font-bold">22+</p>
                                    <p className="text-[10px] uppercase tracking-wider text-white/60 mt-1 leading-tight">года опыта</p>
                                </div>
                                <div className="rounded-2xl bg-white/8 p-3 text-center">
                                    <p className="text-2xl font-exo font-bold">125+</p>
                                    <p className="text-[10px] uppercase tracking-wider text-white/60 mt-1 leading-tight">запусков</p>
                                </div>
                                <div className="rounded-2xl bg-white/8 p-3 text-center">
                                    <p className="text-2xl font-exo font-bold">85+</p>
                                    <p className="text-[10px] uppercase tracking-wider text-white/60 mt-1 leading-tight">программ</p>
                                </div>
                                <div className="rounded-2xl bg-white/8 p-3 text-center">
                                    <p className="text-2xl font-exo font-bold">80%</p>
                                    <p className="text-[10px] uppercase tracking-wider text-white/60 mt-1 leading-tight">результат</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHeroSection;
