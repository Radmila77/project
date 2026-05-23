import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import api from '../../api.js';
import { quizIntro, quizQuestions, quizResults } from './quizData.js';
import QuizProgress from './QuizProgress.jsx';
import QuizQuestionCard from './QuizQuestionCard.jsx';
import QuizResultCard from './QuizResultCard.jsx';

const PERSONAL_DATA_CONSENT_URL = '/documents/personal-data-consent.pdf';

const initialLeadForm = {
    name: '',
    telegram: '',
    consent: false
};

const QUIZ_START_ENDPOINT = '/quizzes';
const getQuizResultEndpoint = (quizId) => `/quizzes/${quizId}/result`;

const getResultKey = (answers) => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const averageScore = totalScore / Math.max(answers.length, 1);

    if (averageScore <= 0.9) {
        return 'chaos';
    }

    if (averageScore <= 2.2) {
        return 'holes';
    }

    return 'machine';
};

const QuizPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [leadForm, setLeadForm] = useState(initialLeadForm);
    const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
    const [quizId, setQuizId] = useState(null);
    const [leadFormErrors, setLeadFormErrors] = useState({});
    const [leadFormRequestError, setLeadFormRequestError] = useState('');
    const [isStartingQuiz, setIsStartingQuiz] = useState(false);
    const [isSavingResult, setIsSavingResult] = useState(false);
    const [isResultSaved, setIsResultSaved] = useState(false);
    const [hasTriedToSaveResult, setHasTriedToSaveResult] = useState(false);
    const [resultRequestError, setResultRequestError] = useState('');

    const currentQuestion = quizQuestions[currentStep];
    const isCompleted = currentStep >= quizQuestions.length;
    const canStartQuiz = leadForm.name.trim() && leadForm.telegram.trim() && leadForm.consent;

    const selectedOptionId = currentQuestion
        ? answers.find((answer) => answer.questionId === currentQuestion.id)?.optionId
        : null;

    const resultKey = useMemo(() => getResultKey(answers), [answers]);
    const result = quizResults[resultKey];

    useEffect(() => {
        if (!hasStartedQuiz || !isCompleted || !quizId || isResultSaved || isSavingResult || hasTriedToSaveResult) {
            return;
        }

        const saveResult = async () => {
            setIsSavingResult(true);
            setHasTriedToSaveResult(true);
            setResultRequestError('');

            try {
                await api.post(getQuizResultEndpoint(quizId), {
                    name: leadForm.name.trim(),
                    telegram: leadForm.telegram.trim(),
                    consent: leadForm.consent,
                    result_key: resultKey,
                    quiz_answers: answers
                });

                setIsResultSaved(true);
            } catch (error) {
                const validationErrors = error.response?.data?.errors;
                const validationMessage = validationErrors
                    ? Object.values(validationErrors).flat().filter(Boolean)[0]
                    : '';

                setResultRequestError(
                    validationMessage || error.response?.data?.message || 'Не удалось сохранить результат квиза. Попробуйте ещё раз.'
                );
            } finally {
                setIsSavingResult(false);
            }
        };

        saveResult();
    }, [answers, hasStartedQuiz, hasTriedToSaveResult, isCompleted, isResultSaved, isSavingResult, leadForm.consent, leadForm.name, leadForm.telegram, quizId, resultKey]);

    const handleSelectOption = (option) => {
        const nextAnswers = [
            ...answers.filter((answer) => answer.questionId !== currentQuestion.id),
            {
                questionId: currentQuestion.id,
                questionTitle: currentQuestion.title,
                questionPrompt: currentQuestion.prompt,
                optionId: option.id,
                optionLabel: option.label,
                score: option.score
            }
        ];

        setAnswers(nextAnswers);

        window.setTimeout(() => {
            setCurrentStep((step) => Math.min(step + 1, quizQuestions.length));
        }, 220);
    };

    const handleRestart = () => {
        setAnswers([]);
        setCurrentStep(0);
        setHasStartedQuiz(false);
        setLeadForm(initialLeadForm);
        setQuizId(null);
        setLeadFormErrors({});
        setLeadFormRequestError('');
        setIsStartingQuiz(false);
        setIsSavingResult(false);
        setIsResultSaved(false);
        setHasTriedToSaveResult(false);
        setResultRequestError('');
    };

    const handleLeadFormChange = (event) => {
        const { name, type, value, checked } = event.target;

        setLeadForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'consent') {
            setLeadFormErrors((current) => ({
                ...current,
                consent: ''
            }));
        } else {
            setLeadFormErrors((current) => ({
                ...current,
                [name]: ''
            }));
        }

        setLeadFormRequestError('');
    };

    const handleStartQuiz = async (event) => {
        event.preventDefault();

        if (!canStartQuiz) {
            return;
        }

        setIsStartingQuiz(true);
        setLeadFormRequestError('');

        try {
            const response = await api.post(QUIZ_START_ENDPOINT, {
                name: leadForm.name.trim(),
                telegram: leadForm.telegram.trim(),
                consent: leadForm.consent
            });

            setQuizId(response.data?.id ?? response.data?.data?.id ?? null);
            setLeadFormErrors({});
            setHasStartedQuiz(true);
        } catch (error) {
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                setLeadFormErrors({
                    name: validationErrors.name?.[0] || '',
                    telegram: validationErrors.telegram?.[0] || '',
                    consent: validationErrors.consent?.[0] || ''
                });
            } else {
                setLeadFormRequestError(
                    error.response?.data?.message || 'Не удалось начать квиз. Попробуйте ещё раз.'
                );
            }
        } finally {
            setIsStartingQuiz(false);
        }
    };

    const handleRetryResultSave = async () => {
        if (!quizId || isSavingResult) {
            return;
        }

        setIsSavingResult(true);
        setHasTriedToSaveResult(true);
        setResultRequestError('');

        try {
            await api.post(getQuizResultEndpoint(quizId), {
                name: leadForm.name.trim(),
                telegram: leadForm.telegram.trim(),
                consent: leadForm.consent,
                result_key: resultKey,
                quiz_answers: answers
            });

            setIsResultSaved(true);
        } catch (error) {
            const validationErrors = error.response?.data?.errors;
            const validationMessage = validationErrors
                ? Object.values(validationErrors).flat().filter(Boolean)[0]
                : '';

            setResultRequestError(
                validationMessage || error.response?.data?.message || 'Не удалось сохранить результат квиза. Попробуйте ещё раз.'
            );
        } finally {
            setIsSavingResult(false);
        }
    };

    return (
        <main className="flex-1 bg-[#f6efec] px-4 py-10 md:py-14">
            <div className="container mx-auto px-4">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-[42px] border border-black/6 bg-[linear-gradient(180deg,#fff9f7_0%,#fff_100%)] shadow-[0_30px_100px_rgba(52,15,18,0.10)]"
                >
                    <div className="grid lg:min-h-[760px] lg:grid-cols-[0.36fr_0.64fr]">
                        <aside className="relative overflow-hidden border-b border-black/6 bg-custom-bkred px-6 py-7 text-white lg:border-b-0 lg:border-r lg:border-white/8 lg:px-7 lg:py-8">
                            <div className="absolute right-[-70px] top-[-40px] h-52 w-52 rounded-full bg-white/6 blur-2xl"></div>
                            <div className="absolute bottom-[-80px] left-[-40px] h-56 w-56 rounded-full bg-custom-red/30 blur-3xl"></div>

                            <div className="relative z-10">
                                <p className="text-sm font-exo font-bold uppercase tracking-[0.24em] text-white/72">
                                    {quizIntro.badge}
                                </p>

                                <h1 className="mt-5 text-4xl font-exo font-bold leading-[0.94] md:text-5xl">
                                    {quizIntro.title}
                                </h1>

                                <p className="mt-5 text-base leading-relaxed text-white/78">
                                    {quizIntro.description}
                                </p>

                                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-5">
                                    <p className="text-xs font-exo font-bold uppercase tracking-[0.18em] text-white/56">
                                        Формат
                                    </p>
                                    <p className="mt-3 text-lg leading-relaxed text-white">
                                        Небольшой квест на 5 шагов: выбираете сценарии, а в конце получаете свой главный вектор роста.
                                    </p>
                                </div>

                                <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
                                    <p className="text-xs font-exo font-bold uppercase tracking-[0.18em] text-white/56">
                                        Статус миссии
                                    </p>
                                    <div className="mt-3 space-y-3">
                                        {quizQuestions.map((question, index) => {
                                            const isActive = index === currentStep && !isCompleted;
                                            const isDone = answers.some((answer) => answer.questionId === question.id);

                                            return (
                                                <div
                                                    key={question.id}
                                                    className={`rounded-[20px] px-4 py-3 text-sm transition-all ${
                                                        isActive
                                                            ? 'bg-white text-custom-bkred'
                                                            : isDone
                                                                ? 'bg-white/12 text-white'
                                                                : 'bg-black/12 text-white/52'
                                                    }`}
                                                >
                                                    0{index + 1}. {question.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        </aside>

                        <div className="px-4 py-5 sm:px-5 md:px-8 md:py-8">
                            <div className="mx-auto flex h-full max-w-3xl flex-col">
                                {!hasStartedQuiz ? (
                                    <motion.form
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleStartQuiz}
                                        className="my-auto rounded-[34px] border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(36,11,14,0.06)] md:p-8"
                                    >
                                        <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                                            Старт квиза
                                        </p>

                                        <h2 className="mt-4 text-3xl font-exo font-bold leading-tight text-custom-bkred md:text-4xl">
                                            Сначала оставьте контакт, и после этого можно будет перейти к вопросам.
                                        </h2>


                                        <div className="mt-8 grid gap-5">
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                                                    Ваше имя
                                                </span>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={leadForm.name}
                                                    onChange={handleLeadFormChange}
                                                    placeholder="Например, Елена"
                                                    className={`w-full rounded-[20px] bg-[#fff8f6] px-5 py-4 text-base text-custom-bkred outline-none transition-colors placeholder:text-custom-gray/55 ${
                                                        leadFormErrors.name
                                                            ? 'border border-[#c24646]/70 focus:border-[#c24646]'
                                                            : 'border border-black/10 focus:border-custom-red'
                                                    }`}
                                                />

                                                {leadFormErrors.name ? (
                                                    <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                                                        {leadFormErrors.name}
                                                    </p>
                                                ) : null}
                                            </label>

                                            <label className="block">
                                                <span className="mb-2 block text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                                                    Telegram
                                                </span>
                                                <input
                                                    type="text"
                                                    name="telegram"
                                                    value={leadForm.telegram}
                                                    onChange={handleLeadFormChange}
                                                    placeholder="nickname или @nickname"
                                                    className={`w-full rounded-[20px] bg-[#fff8f6] px-5 py-4 text-base text-custom-bkred outline-none transition-colors placeholder:text-custom-gray/55 ${
                                                        leadFormErrors.telegram
                                                            ? 'border border-[#c24646]/70 focus:border-[#c24646]'
                                                            : 'border border-black/10 focus:border-custom-red'
                                                    }`}
                                                />

                                                {leadFormErrors.telegram ? (
                                                    <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                                                        {leadFormErrors.telegram}
                                                    </p>
                                                ) : null}
                                            </label>

                                            <label
                                                className={`flex items-start gap-3 rounded-[22px] bg-[#fff6f4] px-4 py-4 text-custom-gray ${
                                                    leadFormErrors.consent
                                                        ? 'border border-[#c24646]/70'
                                                        : 'border border-black/8'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="consent"
                                                    checked={leadForm.consent}
                                                    onChange={handleLeadFormChange}
                                                    className="mt-1 h-5 w-5 accent-custom-red"
                                                />
                                                <span className="text-sm leading-relaxed">
                                                    Согласен(а) на обработку{' '}
                                                    <a
                                                        href={PERSONAL_DATA_CONSENT_URL}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium text-custom-red underline underline-offset-2 transition-colors hover:text-custom-bkred"
                                                    >
                                                        персональных данных
                                                    </a>
                                                    .
                                                </span>
                                            </label>

                                            {leadFormErrors.consent ? (
                                                <p className="mt-[-8px] text-sm leading-relaxed text-[#c24646]">
                                                    {leadFormErrors.consent}
                                                </p>
                                            ) : null}

                                            {leadFormRequestError ? (
                                                <div className="rounded-[20px] border border-[#c24646]/20 bg-[#fff4f4] px-4 py-4 text-sm leading-relaxed text-[#b53a3a]">
                                                    {leadFormRequestError}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                            <button
                                                type="submit"
                                                disabled={!canStartQuiz || isStartingQuiz}
                                                className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] transition-transform ${
                                                    canStartQuiz && !isStartingQuiz
                                                        ? 'bg-custom-red text-white hover:-translate-y-0.5 hover:bg-custom-bkred'
                                                        : 'cursor-not-allowed bg-[#ead8d3] text-white/80'
                                                }`}
                                            >
                                                {isStartingQuiz ? 'Запускаем...' : 'Начать квиз'}
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : !isCompleted ? (
                                    <>
                                        <QuizProgress currentStep={currentStep + 1} totalSteps={quizQuestions.length} />

                                        <div className="mt-6 flex-1">
                                            <QuizQuestionCard
                                                question={currentQuestion}
                                                currentIndex={currentStep}
                                                total={quizQuestions.length}
                                                selectedOptionId={selectedOptionId}
                                                onSelect={handleSelectOption}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="my-auto">
                                        <QuizResultCard
                                            result={result}
                                            onRestart={handleRestart}
                                            isSavingResult={isSavingResult}
                                            isResultSaved={isResultSaved}
                                            saveError={resultRequestError}
                                            onRetrySave={handleRetryResultSave}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
};

export default QuizPage;
