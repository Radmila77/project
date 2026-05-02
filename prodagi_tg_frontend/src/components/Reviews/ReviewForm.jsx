import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import ReviewStarsInput from './ReviewStarsInput.jsx';

const initialValues = {
    name: '',
    tariff_id: '',
    rating: 0,
    description: ''
};

const tariffOptions = [
    { id: 1, label: 'Стандарт' },
    { id: 2, label: 'VIP' }
];

const ReviewForm = ({ errors = {}, onClose, onFieldChange, onSubmit }) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((current) => ({
            ...current,
            [name]: value
        }));

        onFieldChange?.(name);
    };

    const handleRatingChange = (rating) => {
        setValues((current) => ({
            ...current,
            rating
        }));

        onFieldChange?.('rating');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-8 rounded-[32px] border border-[#efe3e3] bg-[linear-gradient(180deg,#fff_0%,#fcf7f7_100%)] p-6 shadow-[0_18px_45px_rgba(80,1,2,0.08)] md:p-8"
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <p className="text-sm font-exo font-bold uppercase tracking-[0.22em] text-custom-red">
                        Написать отзыв
                    </p>
                    <h3 className="mt-3 text-3xl font-exo font-bold leading-tight text-custom-bkred">
                        Поделитесь впечатлением в свободной форме.
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-black/8 px-5 text-sm font-semibold text-custom-gray transition-colors hover:border-custom-red hover:text-custom-red"
                >
                    Закрыть
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <label className="block">
                    <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                        Тариф практикума
                    </span>
                    <select
                        name="tariff_id"
                        value={values.tariff_id}
                        onChange={handleChange}
                        className={`w-full rounded-[22px] bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all focus:ring-4 ${
                            errors.tariff_id
                                ? 'border border-[#c24646]/70 focus:border-[#c24646] focus:ring-[#c24646]/10'
                                : 'border border-black/8 focus:border-custom-red/45 focus:ring-custom-red/8'
                        }`}
                    >
                        <option value="">Выберите тариф</option>
                        {tariffOptions.map((tariff) => (
                            <option key={tariff.id} value={tariff.id}>
                                {tariff.label}
                            </option>
                        ))}
                    </select>

                    {errors.tariff_id ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                            {errors.tariff_id}
                        </p>
                    ) : null}
                </label>

                <label className="block">
                    <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                        Имя или профессия
                    </span>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Например, Алина или маркетолог"
                        className={`w-full rounded-[22px] bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:ring-4 ${
                            errors.name
                                ? 'border border-[#c24646]/70 focus:border-[#c24646] focus:ring-[#c24646]/10'
                                : 'border border-black/8 focus:border-custom-red/45 focus:ring-custom-red/8'
                        }`}
                    />

                    {errors.name ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                            {errors.name}
                        </p>
                    ) : null}
                </label>

                <div>
                    <ReviewStarsInput
                        value={values.rating}
                        onChange={handleRatingChange}
                        error={errors.rating}
                    />
                </div>

                <label className="block">
                    <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                        Текст отзыва
                    </span>
                    <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Напишите, что вам понравилось, какой результат получили и чем особенно запомнилась работа"
                        rows={6}
                        className={`min-h-[180px] w-full resize-none rounded-[22px] bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:ring-4 ${
                            errors.description
                                ? 'border border-[#c24646]/70 focus:border-[#c24646] focus:ring-[#c24646]/10'
                                : 'border border-black/8 focus:border-custom-red/45 focus:ring-custom-red/8'
                        }`}
                    />

                    {errors.description ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                            {errors.description}
                        </p>
                    ) : null}
                </label>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-custom-red px-7 py-4 text-sm font-exo font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                    >
                        Отправить отзыв
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

ReviewForm.propTypes = {
    errors: PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
        rating: PropTypes.string,
        tariff_id: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ReviewForm;
