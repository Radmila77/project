import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import {
    secretStorageCta,
    secretStorageVideos,
    SECRET_STORAGE_BOT_URL
} from './secretStorageData.js';

const VideoSlot = ({ title, videoSrc, hint }) => {
    if (videoSrc) {
        return (
            <div className="overflow-hidden rounded-[28px]">
                <video
                    controls
                    preload="metadata"
                    className="block aspect-video w-full rounded-[28px] bg-[#2b1113]"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Ваш браузер не поддерживает встроенное видео.
                </video>
            </div>
        );
    }

    return (
        <div className="flex aspect-video items-center justify-center rounded-[28px] border border-dashed border-custom-red/25 bg-[linear-gradient(135deg,#fff7f5_0%,#f8eeea_100%)] p-8 text-center shadow-[0_18px_45px_rgba(80,1,2,0.05)]">
            <div className="max-w-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-custom-red shadow-sm">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15.75 10.5L10 14.25v-7.5l5.75 3.75z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                    </svg>
                </div>

                <p className="mt-5 text-xl font-exo font-bold text-custom-bkred">
                    Видео для блока «{title}»
                </p>
                <p className="mt-3 text-sm leading-relaxed text-custom-gray">
                    {hint}
                </p>
            </div>
        </div>
    );
};

VideoSlot.propTypes = {
    title: PropTypes.string.isRequired,
    videoSrc: PropTypes.string,
    hint: PropTypes.string
};

const SecretStoragePage = () => {
    return (
        <main className="bg-[#f8f2ef] px-4 py-6 md:py-12">
            <div className="container mx-auto">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[42px] border border-black/6 bg-[linear-gradient(180deg,#fff9f7_0%,#fff 100%)] shadow-[0_30px_100px_rgba(52,15,18,0.08)]"
                >
                    <div className="grid gap-8 px-4 py-6 sm:px-6 md:px-8 md:py-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-10">
                        <aside className="relative self-start overflow-hidden rounded-[34px] bg-custom-bkred px-5 py-6 text-white shadow-[0_20px_60px_rgba(36,11,14,0.14)] sm:px-6 sm:py-7 lg:sticky lg:top-24">
                            <div className="absolute right-[-80px] top-[-50px] h-56 w-56 rounded-full bg-white/6 blur-2xl"></div>
                            <div className="absolute bottom-[-90px] left-[-40px] h-60 w-60 rounded-full bg-custom-red/25 blur-3xl"></div>

                            <div className="relative z-10">
                                <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-white/65">
                                    Секретное хранилище
                                </p>

                                <h1 className="mt-5 text-4xl font-exo font-bold leading-[0.94] md:text-5xl">
                                    Проверенные инструменты для заявок, контента и продаж в Телеграм
                                </h1>

                                <p className="mt-5 text-base leading-relaxed text-white/78">
                                    Здесь собраны видео и готовые материалы, которые можно сразу внедрять в канал: без воды, без лишней теории и без хаоса.
                                </p>

                                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-5">
                                    <p className="text-xs font-exo font-bold uppercase tracking-[0.18em] text-white/56">
                                        Что внутри
                                    </p>
                                    <div className="mt-4 space-y-3 text-sm text-white/84">
                                        <p>4 видео с конкретными инструментами и понятными шагами внедрения.</p>
                                        <p>Ссылки, промты, схемы и рабочие подсказки под каждую тему.</p>
                                        <p>Финальный доступ к секретному хранилищу через Telegram-бот.</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="space-y-8">
                            {secretStorageVideos.map((item, index) => (
                                <motion.section
                                    key={item.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="rounded-3xl bg-[#fffaf9] p-4 shadow-[0_20px_60px_rgba(36,11,14,0.05)] sm:p-5 md:p-6"
                                >
                                    <div className="mb-5 flex flex-wrap items-center gap-3">
                                        <span className="rounded-full bg-custom-red/8 px-4 py-2 text-xs font-exo font-bold uppercase tracking-[0.16em] text-custom-red">
                                            Видео 0{index + 1}
                                        </span>
                                    </div>

                                    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                                        <VideoSlot
                                            title={item.title}
                                            videoSrc={item.videoSrc}
                                            hint={item.hint}
                                        />

                                        <div className="flex flex-col">
                                            <h2 className="text-2xl font-exo font-bold leading-[1.02] text-custom-bkred sm:text-3xl">
                                                {item.title}
                                            </h2>

                                            {item.description ? (
                                                <p className="mt-4 text-base leading-relaxed text-custom-gray">
                                                    {item.description}
                                                </p>
                                            ) : null}

                                            {item.bullets ? (
                                                <div className="mt-5 grid gap-3">
                                                    {item.bullets.map((bullet) => (
                                                        <div key={bullet} className="rounded-[20px] bg-white px-4 py-4 text-custom-bkred shadow-sm">
                                                            <span className="font-medium">{bullet}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}

                                            {item.promptTitle ? (
                                                <div className="mt-5 rounded-[24px] border border-custom-red/12 bg-white px-4 py-4 shadow-sm">
                                                    <p className="text-xs font-exo font-bold uppercase tracking-[0.16em] text-custom-red/78">
                                                        {item.promptTitle}
                                                    </p>
                                                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-custom-gray">
                                                        {item.promptBlocks.map((block) => (
                                                            <p key={block}>{block}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {item.resource ? (
                                                <div className="mt-5">
                                                    <a
                                                        href={item.resource.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center rounded-full border border-custom-red/18 bg-white px-5 py-3 text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-red transition-colors hover:bg-custom-red hover:text-white"
                                                    >
                                                        {item.resource.label}
                                                    </a>
                                                </div>
                                            ) : null}

                                            {item.links ? (
                                                <div className="mt-5 flex flex-wrap gap-3">
                                                    {item.links.map((link) => (
                                                        <a
                                                            key={link.href}
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center rounded-full border border-custom-red/18 bg-white px-5 py-3 text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-red transition-colors hover:bg-custom-red hover:text-white"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </motion.section>
                            ))}

                            <motion.section
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[38px] border border-custom-red/10 bg-[linear-gradient(135deg,#fff6f4_0%,#fceceb_100%)] p-5 shadow-[0_24px_70px_rgba(36,11,14,0.08)] sm:p-6 md:p-8"
                            >
                                <p className="text-sm font-exo font-bold uppercase tracking-[0.2em] text-custom-red">
                                    Доступ к секретному хранилищу
                                </p>

                                <h2 className="mt-4 text-4xl font-exo font-bold leading-[0.98] text-custom-bkred">
                                    {secretStorageCta.title}
                                </h2>

                                <div className="mt-5 space-y-4 text-base leading-relaxed text-custom-gray">
                                    {secretStorageCta.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>

                                <div className="mt-6 grid gap-3 md:grid-cols-3">
                                    {secretStorageCta.steps.map((step, index) => (
                                        <div key={step} className="rounded-[24px] bg-white px-4 py-5 shadow-sm">
                                            <p className="text-xs font-exo font-bold uppercase tracking-[0.16em] text-custom-red/72">
                                                Шаг 0{index + 1}
                                            </p>
                                            <p className="mt-3 text-custom-bkred">{step}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-[24px] border border-custom-red/12 bg-white px-5 py-5 shadow-sm">
                                    <p className="text-sm font-exo font-bold uppercase tracking-[0.16em] text-custom-red/78">
                                        Предупреждение
                                    </p>
                                    <p className="mt-3 text-base leading-relaxed text-custom-gray">
                                        {secretStorageCta.warning}
                                    </p>
                                </div>

                                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-custom-bkred">
                                    {secretStorageCta.footer}
                                </p>

                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                    <a
                                        href={SECRET_STORAGE_BOT_URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-custom-red px-8 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                                    >
                                        {secretStorageCta.buttonLabel}
                                    </a>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
};

export default SecretStoragePage;
