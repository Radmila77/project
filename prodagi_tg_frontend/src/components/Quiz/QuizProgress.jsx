import React from 'react';
import PropTypes from 'prop-types';

const QuizProgress = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                    Прогресс миссии
                </p>
                <p className="text-sm text-custom-gray">
                    {currentStep} / {totalSteps}
                </p>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#efe3e3]">
                <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#880404_0%,#d84e35_100%)] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

QuizProgress.propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired
};

export default QuizProgress;
