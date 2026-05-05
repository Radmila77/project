import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SectionHeader from "../common/SectionHeader.jsx";

const CardCarousel = () => {
    const modules = [
        {
            id: 1,
            title: "Предобучение",
            lessons: [
                "Мышление во время продаж",
                "Как заявить о себе в соцсетях и отстроиться от конкурентов",
                "Базовый урок о продажах в соцсетях"
            ],
            result: "Повысите уверенность и уберете страхи в продажах, получите техническую подготовку для соцсетей.",
        },
        {
            id: 2,
            name: "1 Модуль",
            title: "Продающая упаковка соцсетей",
            lessons: ["Полная упаковка канала", "Две встроенные воронки продаж"],
            bonus: "Схема эффективного лид-магнита",
            result: "Канал начнёт приводить 20−30 заявок в месяц без ежедневного контента.",
        },
        {
            id: 3,
            name: "2 Модуль",
            title: "Продуктовая линейка",
            lessons: ["Продуктовая линейка с максимум дохода", "Как с одного клиента делать максимум прибыли"],
            bonus: "Таблица по продуктовой линейке",
            result: "Вы сможете выходить на доход 100K+ в месяц без выгорания.",
        },
        {
            id: 4,
            name: "3 Модуль",
            title: "Продающий контент",
            lessons: [
                "Где брать идеи для контента",
                "Донести ценность продукта через смыслы",
                "Как писать прогрев к продукту быстро",
                "Как легко писать офферы"
            ],
            bonus: "Готовая схема прогрева в соцсетях",
            result: "Посты приводят до 5−7 заявок в неделю, офферы работают за 3−5 дней.",
        },
        {
            id: 5,
            name: "4 Модуль",
            title: "Бюджетный трафик в соцсетях",
            lessons: ["Бесплатный метод продвижения", "Бюджетный источник трафика"],
            bonus: "Готовые шаблоны и инструкции",
            result: "Привлечете 100−300+ целевых подписчиков бесплатно или с минимальными вложениями.",
        },
        {
            id: 6,
            name: "5 Модуль",
            title: "Рабочие воронки и обработка заявок",
            lessons: [
                "Воронка для быстрых продаж за 5 дней",
                "Воронка для закрытых продаж",
                "Как продавать через переписку"
            ],
            bonus: "Скрипт продаж в переписке",
            result: "Настроите воронку, которая приведёт 5−10 клиентов в первую неделю, закрывая до 70% заявок.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const sectionRef = useRef(null);
    const maxIndex = Math.max(modules.length - visibleCount, 0);
    const safeCurrentIndex = Math.min(currentIndex, maxIndex);

    const nextSlide = () => {
        setCurrentIndex(() =>
            safeCurrentIndex + 1 > maxIndex ? 0 : safeCurrentIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(() =>
            safeCurrentIndex === 0 ? maxIndex : safeCurrentIndex - 1
        );
    };

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
                return;
            }

            if (window.innerWidth < 1280) {
                setVisibleCount(2);
                return;
            }

            setVisibleCount(3);
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);

        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    return (
        <div ref={sectionRef} className="bg-custom-banner-gray overflow-hidden relative">
            <SectionHeader title="Программа практикума"/>
            <div className="relative container mx-auto">


                <div className="relative">
                <div className="overflow-hidden px-2 sm:px-4 xl:px-0">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${safeCurrentIndex * (100 / visibleCount)}%)` }}
                    >
                        {modules.map((mod, idx) => (
                            <motion.div
                                key={mod.id}
                                className="flex-shrink-0 p-2 sm:p-3"
                                style={{ width: `${100 / visibleCount}%` }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex h-full min-h-[420px] flex-col justify-between rounded-[24px] border border-red-100 bg-gray-50 p-5 shadow-lg transition-shadow hover:shadow-xl md:min-h-[460px]">
                                    {mod.name && (
                                        <h2 className="mb-3 text-lg font-semibold text-red-800 md:text-xl">
                                            {mod.name}
                                        </h2>
                                    )}

                                    <h3 className="mb-3 text-xl font-semibold text-red-800 md:text-2xl">
                                        {mod.title}
                                    </h3>

                                    <ul className="mb-3 flex-1 list-disc list-inside text-sm leading-7 text-gray-700 md:text-base">
                                        {mod.lessons.map((lesson, idx) => (
                                            <li key={idx}>{lesson}</li>
                                        ))}
                                    </ul>

                                    {mod.bonus && (
                                        <p className="mb-2 text-sm leading-6 text-green-700">
                                            🎁 Бонус: {mod.bonus}
                                        </p>
                                    )}

                                    <p className="text-sm font-medium leading-7 text-gray-800 md:text-base">
                                        {mod.result}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="group absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-red-100 bg-white text-custom-red shadow-md transition-all duration-300 hover:bg-custom-red hover:text-white sm:-left-3 xl:-left-10 xl:h-12 xl:w-12"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="group absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-red-100 bg-white text-custom-red shadow-md transition-all duration-300 hover:bg-custom-red hover:text-white sm:-right-3 xl:-right-10 xl:h-12 xl:w-12"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-center mt-10 pb-12">
                <Link to="/workshop"
                      className="bg-custom-red hover:bg-custom-bkred text-white font-roboto font-medium py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                    Подробнее о практикуме

                </Link>
            </div>
        </div>
    );
};

export default CardCarousel;
