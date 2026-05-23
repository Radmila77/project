import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import AboutIcon from './AboutIcon.jsx';
import { timeline } from './aboutData.js';

const TimelinePhotoCard = ({ item, index }) => {
    const [hasImageError, setHasImageError] = useState(false);
    const showImage = item.imageSrc && !hasImageError;
    const tiltClass = index % 2 === 0 ? 'md:rotate-[-2deg]' : 'md:rotate-[2deg]';

    return (
        <div className={`mx-auto w-full max-w-[250px] ${tiltClass}`}>
            <div className="relative rounded-[30px] border border-[#e8d4ce] bg-[#fff7f4] p-3 shadow-[0_22px_55px_rgba(52,15,18,0.12)]">
                {showImage ? (
                    <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        onError={() => setHasImageError(true)}
                        className="aspect-[4/5] w-full rounded-[22px] object-cover"
                    />
                ) : (
                    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-custom-red/18 bg-[linear-gradient(180deg,#fffdfc_0%,#f7ece8_100%)] px-5 text-center">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-custom-red/10 text-custom-red">
                            <AboutIcon type="star" className="h-7 w-7" />
                        </span>

                        <p className="mt-5 text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                            {item.year}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-custom-gray">
                            Сюда можно добавить AI-фото этого периода.
                        </p>
                    </div>
                )}

                <div className="px-2 pb-1 pt-4">
                    <p className="text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                        {item.imageCaption}
                    </p>
                </div>
            </div>
        </div>
    );
};

TimelinePhotoCard.propTypes = {
    item: PropTypes.shape({
        imageAlt: PropTypes.string,
        imageCaption: PropTypes.string.isRequired,
        imageSrc: PropTypes.string,
        year: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired
};

const AboutTimelineSection = () => {
    return (
        <section className="relative z-10 px-4 py-10">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-[1fr_0.92fr] gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-5 text-custom-red">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-custom-red/10">
                                <AboutIcon type="growth" />
                            </span>
                            <p className="text-sm font-exo font-bold uppercase tracking-[0.24em]">
                                Мой путь
                            </p>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-exo font-bold text-custom-bkred leading-[0.96] mb-8 max-w-3xl">
                            От офлайн-бизнеса и дилерской сети до системного маркетинга и продаж в соцсетях.
                        </h2>

                        <div className="space-y-6 text-lg text-custom-gray font-roboto leading-relaxed max-w-3xl">
                            <p>
                                Моя карьера началась в офлайн-бизнесе в начале 2003 года: вместе с мужем мы с нуля организовали производство
                                пластиковых окон и металлических дверей и выстроили собственную дилерскую сеть.
                            </p>
                            <p>
                                Этот опыт научил меня видеть всю цепочку: от идеи и создания продукта до его продажи и прибыли.
                                Я всегда говорю с клиентами простым языком конкретных результатов и денег.
                            </p>
                            <p>
                                Ещё в 2004 году я запустила свою первую рекламную кампанию в интернете, что дало мощный скачок в прибыли бизнеса.
                                С тех пор трафик стал моей сильной стороной: я помогаю настраивать его так, чтобы он приводил именно клиентов, а не просто просмотры.
                            </p>
                            <p>
                                Позднее полностью ушла в маркетинг и онлайн-направление. Сегодня я работаю не только с личными проектами,
                                но и являюсь маркетологом агентства «Телега под ключ», где мы помогаем экспертам и компаниям выстраивать продажи в Телеграм.
                            </p>
                            <p>
                                Регулярно обучаюсь новым инструментам, тестирую гипотезы на практике и передаю клиентам только рабочие стратегии.
                                Выступала спикером на онлайн-конференциях и в экспертных марафонах, делясь инструментами продвижения и продаж.
                            </p>
                            <p>
                                Я также автор собственной системы «ТелегаДвиж» — стратегии продвижения и продаж в соцсетях,
                                в рамках которой разработала и внедрила десятки авторских схем запусков с конкретными финансовыми результатами.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="relative"
                    >
                        <div className="relative pl-12">
                            <div className="absolute left-4 top-6 bottom-6 w-px bg-custom-red/18"></div>

                            <div className="space-y-6">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={item.year}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ delay: index * 0.06 }}
                                        className="relative"
                                    >
                                        <span className="absolute -left-[42px] top-8 h-5 w-5 rounded-full border border-white/80 bg-custom-red shadow-[0_10px_24px_rgba(125,15,23,0.18)]"></span>

                                        <div className="rounded-[34px] border border-black/6 bg-white/78 p-7 shadow-[0_24px_60px_rgba(36,11,14,0.08)] backdrop-blur-md">
                                            <div className="grid gap-6 md:grid-cols-[1fr_238px] md:items-start">
                                                <div>
                                                    <p className="mb-3 text-sm font-exo font-bold uppercase tracking-[0.24em] text-custom-red">
                                                        {item.year}
                                                    </p>
                                                    <h3 className="mb-4 text-2xl font-exo font-bold leading-tight text-custom-bkred md:text-3xl">
                                                        {item.title}
                                                    </h3>
                                                    <p className="font-roboto text-lg leading-relaxed text-custom-gray">
                                                        {item.text}
                                                    </p>
                                                </div>

                                                <TimelinePhotoCard item={item} index={index} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutTimelineSection;
