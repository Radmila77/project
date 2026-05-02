import React, { useState } from 'react';
import api from '../../api.js';
import QuestionnaireForm from './QuestionnaireForm.jsx';
import QuestionnaireHero from './QuestionnaireHero.jsx';

const QuestionnairePage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleQuestionnaireSubmit = async (payload) => {
        setIsSubmitting(true);
        setSubmitError('');
        setIsSubmitted(false);

        try {
            await api.post('/questionnaires', payload);
            setFieldErrors({});
            setIsSubmitted(true);
        } catch (error) {
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                const nextErrors = Object.entries(validationErrors).reduce((acc, [fieldName, messages]) => {
                    acc[fieldName] = messages?.[0] || '';
                    return acc;
                }, {});

                setFieldErrors(nextErrors);
                setSubmitError('');
            } else {
                setSubmitError(
                    error.response?.data?.message || 'Не удалось отправить анкету. Попробуйте ещё раз.'
                );
            }

            setIsSubmitted(false);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFieldChange = (fieldName) => {
        setFieldErrors((current) => {
            if (!current[fieldName]) {
                return current;
            }

            return {
                ...current,
                [fieldName]: ''
            };
        });

        setSubmitError('');
    };

    return (
        <main className="bg-[#f7f1ee]">
            <QuestionnaireHero />
            <QuestionnaireForm
                errors={fieldErrors}
                onFieldChange={handleFieldChange}
                isSubmitted={isSubmitted}
                isSubmitting={isSubmitting}
                onSubmit={handleQuestionnaireSubmit}
                submitError={submitError}
            />
        </main>
    );
};

export default QuestionnairePage;
