import React from "react";
import PropTypes from 'prop-types';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import SectionHeader from "../common/SectionHeader.jsx";

const NeuroIcon = ({ type }) => {
    const baseClass = "w-10 h-12 mb-4 text-custom-red transition-transform duration-500 group-hover:scale-110";

    const icons = {
        live: (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        database: (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7M4 7c0-1.1.9-2 2-2h12a2 2 0 012 2M4 7l8 5 8-5M8 12h.01M12 12h.01M16 12h.01" />
            </svg>
        ),
        robot: (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        users: (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    };
    return icons[type] || null;
};

NeuroIcon.propTypes = {
    type: PropTypes.oneOf(['live', 'database', 'robot', 'users']).isRequired
};

export default function NeuroHome() {
    const cards = [
        {
            icon: "live",
            title: "Прямые эфиры и экспертные дни",
            text: "Обратная связь лично от основателя клуба Эльмеры Ахметвалеевой один раз в неделю."
        },
        {
            icon: "database",
            title: "База знаний и материалов",
            text: "Все рабочие инструменты и материалы для вашего денежного результата всегда под рукой."
        },
        {
            icon: "robot",
            title: "Нейропомощники и кураторы",
            text: "Получайте помощь и обратную связь по офферам, постам и лид-магнитам от наших экспертов."
        },
        {
            icon: "users",
            title: "Тренажёр продаж",
            text: "Отрабатывайте навыки продаж и свои скрипты вместе с другими участниками клуба."
        }
    ];

    return (
        <section className="py-24 bg-custom-banner-gray relative overflow-hidden">
            <SectionHeader title="Нейроклуб"/>
            <div className="container mx-auto relative z-10 px-6">
                <div className="mb-16 mt-8">
                    <motion.div
                        className="flex items-start gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="w-1 h-12 bg-custom-red/30 rounded-full mt-1 shrink-0" />

                        <p className="text-xl md:text-2xl font-roboto text-custom-gray max-w-4xl leading-relaxed italic">
                            Присоединяйтесь к сообществу и получайте
                            <span className="text-black font-medium"> рабочие инструменты</span>,
                            крутые фишки и
                            <span className="text-custom-bkred font-semibold underline decoration-custom-red/20 underline-offset-4"> обратную связь </span>
                            от экспертов по продажам.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-red-50 transition-all duration-300 flex flex-col items-start"
                        >
                            <NeuroIcon type={card.icon} />

                            <h3 className="text-lg font-exo font-bold text-black mb-4 group-hover:text-custom-red transition-colors duration-300">
                                {card.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed font-roboto">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-10 pb-12">
                    <Link to="/neuroclub"
                          className="bg-custom-red hover:bg-custom-bkred text-white font-roboto font-medium py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                        Подробнее о нейроклубе
                    </Link>
                </div>
            </div>
        </section>
    );
}
