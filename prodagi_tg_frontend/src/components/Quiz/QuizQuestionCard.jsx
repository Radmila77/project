import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';

const QuizQuestionCard = ({ question, currentIndex, selectedOptionId, onSelect }) => {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[34px] border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(36,11,14,0.06)] md:p-8"
        >
            <div className="flex flex-col gap-3 border-b border-black/6 pb-5">
                <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red/75">
                    Задание 0{currentIndex + 1}
                </p>
                <h2 className="text-3xl font-exo font-bold leading-tight text-custom-bkred">
                    {question.title}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-custom-gray">
                    {question.prompt}
                </p>
            </div>

            <div className="mt-6 grid gap-4">
                {question.options.map((option, optionIndex) => {
                    const isActive = selectedOptionId === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onSelect(option)}
                            className={`group rounded-[26px] border px-5 py-5 text-left transition-all ${
                                isActive
                                    ? 'border-custom-red bg-custom-red/[0.05] shadow-[0_14px_40px_rgba(136,4,4,0.08)]'
                                    : 'border-black/8 bg-[#fff9f8] hover:border-custom-red/30 hover:bg-white'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <span
                                    className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-exo font-bold transition-all ${
                                        isActive
                                            ? 'bg-custom-red text-white'
                                            : 'bg-white text-custom-bkred group-hover:bg-custom-red/8'
                                    }`}
                                >
                                    0{optionIndex + 1}
                                </span>

                                <div>
                                    <p className="text-lg font-roboto leading-relaxed text-custom-bkred">
                                        {option.label}
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

        </motion.div>
    );
};

QuizQuestionCard.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired
            })
        ).isRequired,
        prompt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    currentIndex: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    selectedOptionId: PropTypes.string,
    onSelect: PropTypes.func.isRequired
};

export default QuizQuestionCard;
