import { questionnaireMetaFields, questionnaireSections } from './questionnaireData.js';

const getAllFields = () => [
    ...questionnaireSections.flatMap((section) => section.fields),
    ...questionnaireMetaFields
];

export const createInitialQuestionnaireState = () =>
    getAllFields().reduce((acc, field) => {
        acc[field.name] = field.type === 'checkbox-group' ? [] : field.type === 'checkbox' ? false : '';
        return acc;
    }, {});

export const validateQuestionnaire = (values) => {
    const errors = {};

    getAllFields().forEach((field) => {
        const value = values[field.name];

        if (!field.required) {
            return;
        }

        if (field.type === 'checkbox' && !value) {
            errors[field.name] = 'Подтвердите согласие, чтобы отправить анкету.';
            return;
        }

        if (field.type === 'checkbox-group' && (!Array.isArray(value) || value.length === 0)) {
            errors[field.name] = 'Выберите хотя бы один вариант.';
            return;
        }

        if (typeof value === 'string' && value.trim() === '') {
            errors[field.name] = 'Это поле нужно заполнить.';
        }
    });

    return errors;
};

export const buildQuestionnairePayload = (values) => ({
    ...values
});
