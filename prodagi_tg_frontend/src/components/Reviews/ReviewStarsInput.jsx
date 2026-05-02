import React from 'react';
import PropTypes from 'prop-types';

const ReviewStarsInput = ({ value, onChange, error }) => {
    return (
        <div>
            <p className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                Оценка
            </p>

            <div className="flex flex-wrap items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl transition-all ${
                            star <= value
                                ? 'border-[#f4c14d] bg-[#fff6dc] text-[#f0b129]'
                                : 'border-black/8 bg-white text-[#d8cfc8] hover:border-[#f4c14d]/50'
                        }`}
                        aria-label={`Выбрать ${star} ${star === 1 ? 'звезду' : star < 5 ? 'звезды' : 'звёзд'}`}
                    >
                        ★
                    </button>
                ))}

                <p className="text-sm text-custom-gray">
                    {value > 0 ? `Вы выбрали: ${value} из 5` : 'Выберите количество звёзд'}
                </p>
            </div>

            {error ? (
                <p className="mt-3 text-sm leading-relaxed text-[#c24646]">
                    {error}
                </p>
            ) : null}
        </div>
    );
};

ReviewStarsInput.propTypes = {
    error: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ReviewStarsInput;
