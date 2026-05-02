import React from 'react';
import { Link } from 'react-router-dom';


const Icon = ({ type }) => {
    const baseClass = "w-10 h-10 mb-4 text-custom-red transition-transform duration-500 group-hover:scale-110";

    if (type === 'quiz') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }
    if (type === 'library') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        );
    }
    if (type === 'questionnaire') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }
    return null;
};

const CardBanner = ({ title, description, to, iconType, titleClassName = '', descriptionClassName = '' }) => {
    return (
        <Link to={to} className="group relative block h-full">
            <div className="relative flex h-full min-h-[260px] w-full flex-col items-start justify-start overflow-hidden rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition-all duration-500 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl md:min-h-64 md:p-8">

                <div className="absolute inset-0 border-2 border-custom-red opacity-0 rotate-12 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0 z-0" />

                <div className="relative z-10 flex flex-col items-start text-left">

                    <Icon type={iconType} />

                    <h3 className={`mb-3 text-2xl font-exo font-bold leading-[1.08] text-black transition-colors duration-300 break-words group-hover:text-custom-red md:text-[1.75rem] ${titleClassName}`}>
                        {title}
                    </h3>

                    <p className={`mb-6 text-base leading-relaxed text-gray-600 md:text-lg ${descriptionClassName}`}>
                        {description}
                    </p>
                </div>

                <div className="absolute bottom-5 right-6 hidden items-center gap-2 text-custom-red opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex md:bottom-6 md:right-8">
                    <span className="text-sm font-semibold">Перейти</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
            </div>
        </Link>
    );
};

export default CardBanner;
