import React from 'react';
import { motion } from "motion/react";
import AnimatedSvg from "./AnimatedSvg.jsx";
import {ReactComponent as Elmera} from 'src/assets/banner image.svg';
import CardBanner from "./CardBanner.jsx";

const Banner = () => {
    return (
        <div className="relative min-h-[760px] w-full overflow-hidden md:min-h-[860px] xl:min-h-[980px] 2xl:min-h-[940px]">

            <div className="absolute inset-0 bg-custom-banner-gray -z-10"></div>

            <div className="absolute right-0 top-24 z-0 hidden xl:block xl:top-auto xl:bottom-115 2xl:right-100 2xl:bottom-105">
                <AnimatedSvg/>
            </div>

            <div className="absolute right-0 top-6 z-10 hidden xl:block xl:pr-10 2xl:right-100 2xl:pr-12">
                <Elmera className="h-auto w-[400px] max-w-full 2xl:w-[400px]" />
            </div>

            <motion.div
                className="absolute left-4 top-8 z-0 h-20 w-20 rounded-full bg-custom-circle-small opacity-40 md:left-10 md:top-10 md:h-32 md:w-32 2xl:left-100 2xl:top-12"
                whileHover={{ scale: 1.1, opacity: 0.6 }}
                whileTap={{ scale: 0.95 }}
            />

            <motion.div
                className="absolute -bottom-20 -right-20 z-0 h-52 w-52 rounded-full bg-custom-circle-small opacity-30 md:h-80 md:w-80 2xl:right-65"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                whileHover={{ scale: 1.05, opacity: 0.5 }}
            />

            <div className="relative z-10 container mx-auto flex flex-col items-start gap-8 px-4 pt-20 md:pt-28 lg:min-h-[420px] lg:flex-row lg:items-center lg:justify-between 2xl:min-h-[460px]">
                <div className="w-full max-w-2xl md:w-full lg:max-w-[600px] xl:w-1/2 2xl:max-w-[720px]">
                    <h1 className="mb-6 text-4xl font-exo font-bold leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
                        <span className="block text-black">ПРАКТИКУМ</span>
                        <span className="block text-custom-red">ЗАПУСТИ ПРОДАЖИ</span>
                        <span className="block text-custom-red">НА 100K+</span>
                    </h1>

                    <p className="mb-8 max-w-lg font-roboto text-lg leading-relaxed text-custom-gray md:text-xl">
                        Системный подход, готовые шаги и работающие шаблоны — без хаоса и проб и ошибок.
                    </p>
                </div>

            </div>

            <div className="container relative z-20 mx-auto mt-10 mb-20 grid grid-cols-1 gap-6 px-4 font-roboto md:mt-12 md:grid-cols-2 md:[&>*:last-child]:col-span-2 md:[&>*:last-child]:mx-auto md:[&>*:last-child]:w-full md:[&>*:last-child]:max-w-[calc(50%-12px)] xl:mt-16 xl:grid-cols-3 xl:[&>*:last-child]:col-span-1 xl:[&>*:last-child]:max-w-none 2xl:mt-20">
                <CardBanner
                    to="/quiz"
                    iconType="quiz"
                    title="Пройти квиз"
                    description="Проверьте свои продажи и узнайте, что улучшить"
                />

                <CardBanner
                    to="/library"
                    iconType="library"
                    title="Секретное хранилище"
                    description="Забери готовые решения для увеличения заявок и продаж"
                />

                <CardBanner
                    to="/questionnaire"
                    iconType="questionnaire"
                    title="Чек-ап продажи"
                    description="Оцените текущий уровень продаж и получите рекомендации"
                />
            </div>

        </div>
    );
};

export default Banner;
