import React from 'react';
import PropTypes from 'prop-types';

const baseInputClassName =
    'w-full rounded-[22px] border border-black/8 bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:border-custom-red/45 focus:ring-4 focus:ring-custom-red/8';

const QuestionnaireField = ({ field, value, error, onChange, onCheckboxGroupChange }) => {
    const labelContent = (
        <span className="inline">
            {field.label}
            {field.required ? <span className="whitespace-nowrap text-custom-red"> *</span> : null}
        </span>
    );

    if (field.type === 'textarea') {
        return (
            <label className="block">
                <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                    {labelContent}
                </span>
                <textarea
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    rows={5}
                    className={`min-h-[152px] resize-none ${error
                        ? 'w-full rounded-[22px] border border-[#c24646]/70 bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                        : baseInputClassName
                    }`}
                />
                {error ? <p className="mt-2 text-sm text-custom-red">{error}</p> : null}
            </label>
        );
    }

    if (field.type === 'select') {
        return (
            <label className="block">
                <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                    {labelContent}
                </span>
                <select
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    className={error
                        ? 'w-full rounded-[22px] border border-[#c24646]/70 bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                        : baseInputClassName
                    }
                >
                    <option value="">Выберите вариант</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error ? <p className="mt-2 text-sm text-custom-red">{error}</p> : null}
            </label>
        );
    }

    if (field.type === 'radio') {
        return (
            <fieldset>
                <legend className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                    {labelContent}
                </legend>
                <div className="grid gap-3">
                    {field.options.map((option) => (
                        <label
                            key={option}
                            className={`flex cursor-pointer items-start gap-3 rounded-[22px] border px-4 py-4 transition-all ${
                                value === option
                                    ? 'border-custom-red bg-custom-red/[0.05]'
                                    : error
                                        ? 'border-[#c24646]/70 bg-white hover:border-[#c24646]/70'
                                        : 'border-black/8 bg-white hover:border-custom-red/25'
                            }`}
                        >
                            <input
                                type="radio"
                                name={field.name}
                                value={option}
                                checked={value === option}
                                onChange={onChange}
                                className="mt-1 h-4 w-4 accent-custom-red"
                            />
                            <span className="text-custom-gray">{option}</span>
                        </label>
                    ))}
                </div>
                {error ? <p className="mt-2 text-sm text-custom-red">{error}</p> : null}
            </fieldset>
        );
    }

    if (field.type === 'checkbox-group') {
        return (
            <fieldset>
                <legend className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                    {labelContent}
                </legend>
                <div className="grid gap-3">
                    {field.options.map((option) => {
                        const checked = value.includes(option);

                        return (
                            <label
                                key={option}
                                className={`flex cursor-pointer items-start gap-3 rounded-[22px] border px-4 py-4 transition-all ${
                                    checked
                                        ? 'border-custom-red bg-custom-red/[0.05]'
                                        : error
                                            ? 'border-[#c24646]/70 bg-white hover:border-[#c24646]/70'
                                            : 'border-black/8 bg-white hover:border-custom-red/25'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => onCheckboxGroupChange(field.name, option)}
                                    className="mt-1 h-4 w-4 accent-custom-red"
                                />
                                <span className="text-custom-gray">{option}</span>
                            </label>
                        );
                    })}
                </div>
                {error ? <p className="mt-2 text-sm text-custom-red">{error}</p> : null}
            </fieldset>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <label className={`flex items-start gap-3 rounded-[22px] bg-white px-4 py-4 ${
                error ? 'border border-[#c24646]/70' : 'border border-black/8'
            }`}>
                <input
                    type="checkbox"
                    name={field.name}
                    checked={Boolean(value)}
                    onChange={onChange}
                    className="mt-1 h-4 w-4 accent-custom-red"
                />
                <span className="text-custom-gray">{labelContent}</span>
                {error ? <span className="ml-auto text-sm text-custom-red">{error}</span> : null}
            </label>
        );
    }

    return (
        <label className="block">
            <span className="mb-3 block text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-bkred">
                {labelContent}
            </span>
            <input
                type={field.type}
                name={field.name}
                value={value}
                onChange={onChange}
                placeholder={field.placeholder}
                className={error
                    ? 'w-full rounded-[22px] border border-[#c24646]/70 bg-white px-5 py-4 text-base text-custom-bkred outline-none transition-all placeholder:text-custom-gray/45 focus:border-[#c24646] focus:ring-4 focus:ring-[#c24646]/10'
                    : baseInputClassName
                }
            />
            {error ? <p className="mt-2 text-sm text-custom-red">{error}</p> : null}
        </label>
    );
};

QuestionnaireField.propTypes = {
    field: PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        type: PropTypes.string.isRequired
    }).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]).isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCheckboxGroupChange: PropTypes.func.isRequired
};

QuestionnaireField.defaultProps = {
    error: ''
};

export default QuestionnaireField;
