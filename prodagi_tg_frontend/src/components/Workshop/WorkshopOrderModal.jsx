import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import api from '../../api.js';

const emptyValues = {
    name: '',
    telegram: '',
    email: '',
};

const WorkshopOrderModal = ({ plan, onClose }) => {
    const [values, setValues] = useState(emptyValues);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: '',
        }));
        setSubmitError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await api.post('/orders', {
                ...values,
                tariff: plan.tariff,
            });

            const paymentUrl = response.data?.payment_url;

            if (!paymentUrl) {
                throw new Error('Не удалось получить ссылку на оплату.');
            }

            window.location.href = paymentUrl;
        } catch (error) {
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                setErrors({
                    name: validationErrors.name?.[0] || '',
                    telegram: validationErrors.telegram?.[0] || '',
                    email: validationErrors.email?.[0] || '',
                    tariff: validationErrors.tariff?.[0] || '',
                });
            } else {
                setSubmitError(
                    error.response?.data?.message || error.message || 'Не удалось перейти к оплате. Попробуйте ещё раз.'
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#220b0e]/55 px-4 py-6"
        >
            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="my-auto w-full max-w-2xl rounded-[34px] border border-custom-red/10 bg-white p-5 shadow-[0_30px_80px_rgba(36,11,14,0.22)] md:p-8"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                            Оформление заказа
                        </p>
                        <h3 className="mt-3 text-2xl font-exo font-bold text-custom-bkred sm:text-3xl">
                            {plan.name}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 text-custom-bkred transition-colors hover:border-custom-red hover:text-custom-red"
                        aria-label="Закрыть окно оплаты"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
                    <div className="rounded-[28px] bg-[#fff7f6] p-5">
                        <p className="text-xs font-exo font-bold uppercase tracking-[0.2em] text-custom-red/78">
                            Ваш тариф
                        </p>
                        <p className="mt-3 text-3xl font-exo font-bold text-custom-bkred sm:text-4xl">
                            {plan.price}
                        </p>
                        <p className="mt-4 text-custom-gray leading-relaxed">
                            {plan.description}
                        </p>

                        <div className="mt-6 rounded-[22px] border border-custom-red/10 bg-white px-4 py-4 text-sm leading-relaxed text-custom-gray">
                            Доступ к закрытому каналу придёт на почту после подтверждения оплаты.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                                Имя
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className={`w-full rounded-[22px] border bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all ${
                                    errors.name
                                        ? 'border-[#c24646]/70 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                                        : 'border-black/8 focus:border-custom-red/45 focus:ring-4 focus:ring-custom-red/8'
                                }`}
                            />
                            {errors.name ? <p className="mt-2 text-sm text-custom-red">{errors.name}</p> : null}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                                Telegram
                            </span>
                            <input
                                type="text"
                                name="telegram"
                                value={values.telegram}
                                onChange={handleChange}
                                placeholder="@username"
                                className={`w-full rounded-[22px] border bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all ${
                                    errors.telegram
                                        ? 'border-[#c24646]/70 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                                        : 'border-black/8 focus:border-custom-red/45 focus:ring-4 focus:ring-custom-red/8'
                                }`}
                            />
                            {errors.telegram ? <p className="mt-2 text-sm text-custom-red">{errors.telegram}</p> : null}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-exo font-bold uppercase tracking-[0.14em] text-custom-bkred">
                                Email
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className={`w-full rounded-[22px] border bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all ${
                                    errors.email
                                        ? 'border-[#c24646]/70 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                                        : 'border-black/8 focus:border-custom-red/45 focus:ring-4 focus:ring-custom-red/8'
                                }`}
                            />
                            {errors.email ? <p className="mt-2 text-sm text-custom-red">{errors.email}</p> : null}
                        </label>

                        {submitError ? (
                            <div className="rounded-[20px] border border-[#c24646]/20 bg-[#fff3f3] px-4 py-4 text-sm text-[#9b3131]">
                                {submitError}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center rounded-full bg-custom-red px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                        >
                            {isSubmitting ? 'Переходим к оплате...' : 'Оплатить'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

WorkshopOrderModal.propTypes = {
    plan: PropTypes.shape({
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        tariff: PropTypes.oneOf(['standard', 'vip']).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default WorkshopOrderModal;
