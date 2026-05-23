import React, { useState } from 'react';
import { motion } from 'motion/react';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';
const PRIVACY_POLICY_URL = '/documents/privacy-policy.pdf';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const getCookieValue = (name) => {
    if (typeof document === 'undefined') {
        return '';
    }

    const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));

    return match ? decodeURIComponent(match[1]) : '';
};

const setCookieValue = (name, value) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        return getCookieValue(COOKIE_CONSENT_KEY) !== 'true';
    });

    const handleAccept = () => {
        setCookieValue(COOKIE_CONSENT_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-4 right-4 z-40 md:bottom-6 md:right-auto md:max-w-xl"
        >
            <div className="rounded-[28px] border border-custom-red/10 bg-white p-5 shadow-[0_20px_60px_rgba(36,11,14,0.18)] md:p-6">
                <p className="text-sm font-exo font-bold uppercase tracking-[0.18em] text-custom-red">
                    Cookie
                </p>

                <p className="mt-3 text-sm leading-relaxed text-custom-gray md:text-base">
                    Сайт использует cookie, чтобы корректно работать, запоминать ваши настройки и улучшать пользовательский опыт.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={handleAccept}
                        className="inline-flex items-center justify-center rounded-full bg-custom-red px-5 py-3 text-sm font-exo font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-custom-bkred"
                    >
                        Принять
                    </button>

                    <p className="text-xs leading-relaxed text-custom-gray/80">
                        Если вы продолжаете использовать сайт, то соглашаетесь с нашей{' '}
                        <a
                            href={PRIVACY_POLICY_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-custom-red underline underline-offset-2 transition-colors hover:text-custom-bkred"
                        >
                            политикой конфиденциальности
                        </a>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default CookieBanner;
