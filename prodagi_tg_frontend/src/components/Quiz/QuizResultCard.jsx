import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';

const QuizResultCard = ({ result, onRestart, isSavingResult, isResultSaved, saveError, onRetrySave }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[34px] border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(36,11,14,0.06)] md:p-8"
        >
            <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                Итог квеста
            </p>

            <h2 className="mt-4 text-3xl font-exo font-bold leading-tight text-custom-bkred md:text-4xl">
                {result.title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-custom-gray">
                {result.description}
            </p>

            <div className="mt-6 grid gap-3">
                {result.bullets.map((item) => (
                    <div key={item} className="rounded-[22px] bg-[#fff6f4] px-4 py-4 text-custom-bkred">
                        {item}
                    </div>
                ))}
            </div>

            <div className="mt-6">
                {isSavingResult ? (
                    <div className="rounded-[22px] border border-black/6 bg-[#fffaf8] px-4 py-4 text-sm leading-relaxed text-custom-gray">
                        Сохраняем ваш результат в системе...
                    </div>
                ) : null}

                {isResultSaved ? (
                    <div className="rounded-[22px] border border-[#d8e8db] bg-[#f6fbf7] px-4 py-4 text-sm leading-relaxed text-[#40654a]">
                        Контакт и результат квиза успешно сохранены.
                    </div>
                ) : null}

                {saveError ? (
                    <div className="rounded-[22px] border border-[#c24646]/18 bg-[#fff4f4] px-4 py-4 text-sm leading-relaxed text-[#b53a3a]">
                        <p>{saveError}</p>

                        <button
                            type="button"
                            onClick={onRetrySave}
                            className="mt-3 inline-flex items-center rounded-full border border-[#c24646]/20 bg-white px-4 py-2 text-xs font-exo font-bold uppercase tracking-[0.14em] text-[#b53a3a] transition-colors hover:bg-[#fff0f0]"
                        >
                            Повторить отправку
                        </button>
                    </div>
                ) : null}
            </div>

            <div className="mt-8 rounded-[28px] border border-custom-red/10 bg-[linear-gradient(135deg,#fff7f5_0%,#fff0ec_100%)] p-5 md:p-6">
                <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                    Следующий шаг
                </p>
                <h3 className="mt-3 text-2xl font-exo font-bold leading-tight text-custom-bkred">
                    Если хотите понять, как перевести этот результат в заявки и продажи, приходите на чек-ап.
                </h3>
                <p className="mt-3 max-w-2xl text-custom-gray leading-relaxed">
                    На чек-апе можно разобрать вашу текущую точку, увидеть слабые места в системе и понять, какой шаг даст самый быстрый рост именно вам.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                        href="https://t.me/m/vDHcw8jFMTYy"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-custom-red px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                    >
                        Хочу чек-ап продаж
                    </a>

                    <button
                        type="button"
                        onClick={onRestart}
                        className="inline-flex items-center justify-center rounded-full border border-black/8 bg-white px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-custom-bkred transition-transform hover:-translate-y-0.5 hover:border-custom-red hover:text-custom-red"
                    >
                        Пройти заново
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

QuizResultCard.propTypes = {
    isResultSaved: PropTypes.bool,
    isSavingResult: PropTypes.bool,
    onRetrySave: PropTypes.func,
    result: PropTypes.shape({
        bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    onRestart: PropTypes.func.isRequired,
    saveError: PropTypes.string
};

export default QuizResultCard;
