import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import api from "../../api.js";
import SectionHeader from "../common/SectionHeader.jsx";
import ReviewForm from '../Reviews/ReviewForm.jsx';

const reviewFilters = [
    { id: 'all', label: 'Все отзывы', apiValue: null },
    { id: 'standard', label: 'Стандарт', apiValue: 'standard' },
    { id: 'vip', label: 'VIP', apiValue: 'vip' }
];

export default function ReviewsHome() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(3);
    const [expandedReviews, setExpandedReviews] = useState({});
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [reviewFormErrors, setReviewFormErrors] = useState({});
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const currentFilter = reviewFilters.find((filter) => filter.id === activeFilter);
        const params = currentFilter?.apiValue ? { tariff: currentFilter.apiValue } : {};

        api.get('/reviews', { params })
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    }, [activeFilter]);

    const toggleExpand = (reviewId) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const showMoreReviews = () => {
        setVisibleCount((current) => current + 3);
    };

    const hideReviews = () => {
        setVisibleCount(3);
    };

    const handleReviewSubmit = async (formValues) => {
        try {
            await api.post('/reviews', formValues);

            setReviewFormErrors({});
            setIsReviewFormOpen(false);
            setShowSuccessModal(true);
        } catch (error) {
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                setReviewFormErrors({
                    consent: validationErrors.consent?.[0] || '',
                    name: validationErrors.name?.[0] || '',
                    rating: validationErrors.rating?.[0] || '',
                    description: validationErrors.description?.[0] || '',
                    tariff_id: validationErrors.tariff_id?.[0] || ''
                });
            }
        }
    };

    const handleReviewFieldChange = (fieldName) => {
        setReviewFormErrors((current) => {
            if (!current[fieldName]) {
                return current;
            }

            return {
                ...current,
                [fieldName]: ''
            };
        });
    };

    const visibleReviews = reviews.slice(0, visibleCount);
    const hasMoreReviews = visibleCount < reviews.length;
    const hasExtraReviews = visibleCount > 3;

    if (loading) {
        return <div className="text-center py-20">Загрузка отзывов...</div>;
    }

    return (
        <section id="reviews" className="py-20 bg-white">
            <SectionHeader title="Отзывы" />

            <div className="container mx-auto px-6">
                {showSuccessModal ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#220b0e]/45 px-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="w-full max-w-md rounded-[32px] border border-custom-red/10 bg-white p-7 text-custom-bkred shadow-[0_30px_80px_rgba(36,11,14,0.18)]"
                        >
                            <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                                Спасибо
                            </p>
                            <h3 className="mt-3 text-2xl font-exo font-bold leading-tight">
                                Ваш отзыв отправлен
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-custom-gray">
                                Спасибо, что поделились впечатлением. После модерации отзыв сможет появиться на сайте.
                            </p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowSuccessModal(false)}
                                    className="inline-flex items-center justify-center rounded-full bg-custom-red px-6 py-3 text-sm font-exo font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}

                <div className="mb-8 flex flex-wrap justify-center gap-3">
                    {reviewFilters.map((filter) => {
                        const isActive = filter.id === activeFilter;

                        return (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => {
                                    setLoading(true);
                                    setActiveFilter(filter.id);
                                    setVisibleCount(3);
                                }}
                                className={`rounded-full px-5 py-3 text-sm font-exo font-bold uppercase tracking-[0.12em] transition ${
                                    isActive
                                        ? 'bg-custom-red text-white shadow-md'
                                        : 'border border-custom-red/20 bg-white text-custom-red hover:bg-custom-red/8'
                                }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {reviews.length === 0 ? (
                    <div className="mb-8 rounded-[28px] border border-[#efe3e3] bg-[#fcf7f7] px-6 py-10 text-center text-custom-gray">
                        По этому тарифу пока нет отзывов.
                    </div>
                ) : null}

                <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visibleReviews.map((review) => {
                        const isExpanded = expandedReviews[review.id];
                        const text = review.description;
                        const needTruncate = text.length > 120;
                        const displayText = isExpanded || !needTruncate
                            ? text
                            : text.slice(0, 120) + '...';
                        const reviewAuthor = review.client?.name || 'Клиент';
                        const initial = reviewAuthor.trim().charAt(0).toUpperCase();
                        const tariffTitle = review.tariff?.title;

                        return (
                            <motion.div
                                key={review.id}
                                className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#efe3e3] bg-gradient-to-b from-white to-[#fcf8f8] p-6 shadow-[0_18px_45px_rgba(80,1,2,0.08)]"
                                whileHover={{ y: -6 }}
                            >
                                <div className="relative z-10 mb-5 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-custom-bkred text-base font-bold text-white shadow-md">
                                            {initial}
                                        </div>

                                        <div>
                                            <h4 className="font-roboto text-base font-bold text-custom-bkred">{reviewAuthor}</h4>
                                            <p className="text-xs uppercase tracking-[0.18em] text-custom-red/70">
                                                {tariffTitle ? `${tariffTitle} · отзыв клиента` : 'отзыв клиента'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="min-w-[76px] whitespace-nowrap rounded-full border border-[#f2e7e7] bg-white/90 px-3 py-1 text-center text-xs font-semibold text-custom-bkred shadow-sm">
                                        {Number(review.rating)} / 5
                                    </div>
                                </div>

                                <div className="mb-4 flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={index < Number(review.rating) ? "text-[#f4b740] text-lg" : "text-[#e3d6d6] text-lg"}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <div className="mb-2 flex-grow font-roboto text-[15px] leading-7 text-custom-gray">
                                    {displayText}
                                </div>

                                {needTruncate ? (
                                    <button
                                        type="button"
                                        onClick={() => toggleExpand(review.id)}
                                        className="mt-4 inline-flex w-fit items-center rounded-full bg-custom-red/8 px-4 py-2 text-sm font-semibold text-custom-red transition hover:bg-custom-red hover:text-white"
                                    >
                                        {isExpanded ? '↑ Свернуть' : '↓ Читать полностью'}
                                    </button>
                                ) : null}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {reviews.length > 0 && hasMoreReviews ? (
                        <button
                            type="button"
                            onClick={showMoreReviews}
                            className="rounded-full bg-custom-red px-6 py-3 font-semibold text-white shadow-md transition hover:bg-custom-bkred"
                        >
                            Больше отзывов
                        </button>
                    ) : null}

                    {reviews.length > 0 && hasExtraReviews ? (
                        <button
                            type="button"
                            onClick={hideReviews}
                            className="rounded-full bg-custom-bkred px-6 py-3 font-semibold text-white shadow-md transition hover:bg-custom-red"
                        >
                            Скрыть отзывы
                        </button>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => {
                            setReviewFormErrors({});
                            setIsReviewFormOpen((current) => !current);
                        }}
                        className="rounded-full border border-custom-red bg-white px-6 py-3 font-semibold text-custom-red shadow-md transition hover:bg-red-100"
                    >
                        Написать отзыв
                    </button>
                </div>

                {isReviewFormOpen ? (
                    <ReviewForm
                        errors={reviewFormErrors}
                        onClose={() => {
                            setReviewFormErrors({});
                            setIsReviewFormOpen(false);
                        }}
                        onFieldChange={handleReviewFieldChange}
                        onSubmit={handleReviewSubmit}
                    />
                ) : null}
            </div>
        </section>
    );
}
