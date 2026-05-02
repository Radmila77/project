import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import QuestionnaireField from './QuestionnaireField.jsx';
import { questionnaireMetaFields, questionnaireSections } from './questionnaireData.js';
import {
    buildQuestionnairePayload,
    createInitialQuestionnaireState
} from './questionnaireHelpers.js';

const QuestionnaireForm = ({ errors = {}, isSubmitted, isSubmitting, onFieldChange, onSubmit, submitError }) => {
    const [values, setValues] = useState(createInitialQuestionnaireState);

    useEffect(() => {
        const orderedFieldNames = [
            ...questionnaireSections.flatMap((section) => section.fields.map((field) => field.name)),
            ...questionnaireMetaFields.map((field) => field.name)
        ];

        const firstInvalidFieldName = orderedFieldNames.find((fieldName) => errors[fieldName]);

        if (!firstInvalidFieldName) {
            return;
        }

        const fieldElement = document.querySelector(
            `[data-questionnaire-field="${firstInvalidFieldName}"]`
        );

        if (!fieldElement) {
            return;
        }

        fieldElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        const focusableElement = fieldElement.querySelector('input, textarea, select');
        focusableElement?.focus({ preventScroll: true });
    }, [errors]);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;

        setValues((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value
        }));

        onFieldChange?.(name);
    };

    const handleCheckboxGroupChange = (fieldName, option) => {
        setValues((current) => {
            const previous = current[fieldName];
            const next = previous.includes(option)
                ? previous.filter((item) => item !== option)
                : [...previous, option];

            return {
                ...current,
                [fieldName]: next
            };
        });

        onFieldChange?.(fieldName);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = buildQuestionnairePayload(values);
        await onSubmit?.(payload);
        setValues(createInitialQuestionnaireState);
    };

    return (
        <section className="relative px-4 pb-12 pt-4 md:pb-18">
            <div className="container mx-auto">
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
                    <motion.aside
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="self-start rounded-[34px] border border-black/6 bg-white p-5 shadow-[0_20px_60px_rgba(36,11,14,0.06)] md:p-6 lg:sticky lg:top-24"
                    >
                        <p className="text-sm font-exo font-bold uppercase tracking-[0.22em] text-custom-red">
                            Структура анкеты
                        </p>

                        <div className="mt-5 space-y-4">
                            {questionnaireSections.map((section, index) => (
                                <div key={section.id} className="rounded-[24px] bg-[#fbf5f4] px-4 py-4">
                                    <p className="text-xs font-exo font-bold uppercase tracking-[0.18em] text-custom-red/70">
                                        Блок 0{index + 1}
                                    </p>
                                    <p className="mt-2 text-lg font-exo font-bold text-custom-bkred">{section.title}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-custom-gray">{section.description}</p>
                                </div>
                            ))}
                        </div>

                    </motion.aside>

                    <motion.form
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="rounded-[38px] border border-black/6 bg-white p-6 shadow-[0_24px_70px_rgba(36,11,14,0.08)] md:p-8"
                    >
                        <div className="space-y-10">
                            {questionnaireSections.map((section, sectionIndex) => (
                                <section key={section.id} className="rounded-[30px] bg-[#fff9f8] p-5 md:p-6">
                                    <div className="mb-6 flex flex-col gap-3 border-b border-black/6 pb-5">
                                        <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red/75">
                                            Блок 0{sectionIndex + 1}
                                        </p>
                                        <h2 className="text-2xl font-exo font-bold text-custom-bkred">
                                            {section.title}
                                        </h2>
                                        <p className="max-w-2xl text-custom-gray">{section.description}</p>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        {section.fields.map((field) => (
                                            <div
                                                key={field.name}
                                                data-questionnaire-field={field.name}
                                                className={field.type === 'textarea' || field.type === 'checkbox-group' ? 'md:col-span-2' : ''}
                                            >
                                                <QuestionnaireField
                                                    field={field}
                                                    error={errors[field.name]}
                                                    value={values[field.name]}
                                                    onChange={handleChange}
                                                    onCheckboxGroupChange={handleCheckboxGroupChange}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}

                            <section className="rounded-[30px] bg-custom-bkred p-5 text-white md:p-6">
                                <div className="mb-6 border-b border-white/10 pb-5">
                                    <h2 className="mt-2 text-2xl font-exo font-bold">Подтверждение и отправка</h2>
                                </div>

                                <div className="space-y-5">
                                    {questionnaireMetaFields.map((field) => (
                                        <div key={field.name} data-questionnaire-field={field.name}>
                                            <QuestionnaireField
                                                field={field}
                                                error={errors[field.name]}
                                                value={values[field.name]}
                                                onChange={handleChange}
                                                onCheckboxGroupChange={handleCheckboxGroupChange}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-custom-bkred transition-transform hover:-translate-y-0.5"
                                    >
                                        {isSubmitting ? 'Отправляем...' : 'Отправить анкету'}
                                    </button>
                                </div>

                                {submitError ? (
                                    <div className="mt-5 rounded-[20px] border border-white/12 bg-white/8 px-4 py-4 text-sm text-white/84">
                                        {submitError}
                                    </div>
                                ) : null}

                                {isSubmitted ? (
                                    <div className="mt-5 rounded-[20px] border border-white/12 bg-white/8 px-4 py-4 text-sm text-white/84">
                                        Анкета успешно отправлена.
                                    </div>
                                ) : null}
                            </section>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

QuestionnaireForm.propTypes = {
    errors: PropTypes.object,
    isSubmitted: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onFieldChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitError: PropTypes.string
};

export default QuestionnaireForm;
