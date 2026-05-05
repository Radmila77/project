import React, { useEffect, useRef, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/Vipely';
const JIVO_WIDGET_ID = 'aeQGkN1fsU';
const JIVO_SCRIPT_SRC = `//code.jivo.ru/widget/${JIVO_WIDGET_ID}`;

function ContactLauncher() {
    const [isOpen, setIsOpen] = useState(false);
    const [isJivoReady, setIsJivoReady] = useState(false);
    const hasInjectedScript = useRef(false);

    useEffect(() => {
        const previousLoadCallback = window.jivo_onLoadCallback;
        const previousCloseCallback = window.jivo_onClose;

        window.jivo_onLoadCallback = () => {
            setIsJivoReady(true);

            if (window.__openJivoFromCustomLauncher) {
                window.__openJivoFromCustomLauncher = false;
                window.jivo_api?.open?.({ start: 'chat' });
                return;
            }

            if (typeof window.jivo_destroy === 'function') {
                window.jivo_destroy();
            }
        };

        window.jivo_onClose = () => {
            if (typeof previousCloseCallback === 'function') {
                previousCloseCallback();
            }

            if (typeof window.jivo_destroy === 'function') {
                window.jivo_destroy();
            }
        };

        return () => {
            window.jivo_onLoadCallback = previousLoadCallback;
            window.jivo_onClose = previousCloseCallback;
        };
    }, []);

    const ensureJivoScript = () => {
        if (hasInjectedScript.current || document.querySelector(`script[src="${JIVO_SCRIPT_SRC}"]`)) {
            hasInjectedScript.current = true;
            return;
        }

        const script = document.createElement('script');
        script.src = JIVO_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
        hasInjectedScript.current = true;
    };

    const openJivoChat = () => {
        setIsOpen(false);

        if (isJivoReady && typeof window.jivo_init === 'function') {
            window.__openJivoFromCustomLauncher = true;
            window.jivo_init();
            return;
        }

        window.__openJivoFromCustomLauncher = true;
        ensureJivoScript();
    };

    return (
        <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-300 ${
                    isOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-3 opacity-0'
                }`}
            >
                <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#27A7E7] text-white shadow-[0_18px_35px_rgba(39,167,231,0.35)] transition-transform hover:-translate-y-1"
                    aria-label="Написать в Telegram"
                >
                    <svg className="h-7 w-7 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M9.52 15.91 9.14 21c.55 0 .79-.24 1.08-.52l2.6-2.49 5.39 3.95c.99.55 1.69.26 1.96-.91l3.56-16.67h0c.31-1.45-.52-2.02-1.48-1.66L1.37 10.44c-1.42.55-1.4 1.34-.24 1.7l5.34 1.66L18.9 5.98c.59-.39 1.12-.17.67.22" />
                    </svg>
                </a>

                <button
                    type="button"
                    onClick={openJivoChat}
                    className="group flex h-14 w-14 items-center justify-center rounded-full bg-custom-red text-white shadow-[0_18px_35px_rgba(80,1,2,0.28)] transition-transform hover:-translate-y-1"
                    aria-label="Открыть чат Jivo"
                >
                    <svg className="h-7 w-7 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h8M8 14h5m-7 6 2.8-2H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className={`group flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_22px_45px_rgba(80,1,2,0.28)] transition-all ${
                    isOpen ? 'bg-custom-bkred rotate-45' : 'bg-custom-red'
                }`}
                aria-label={isOpen ? 'Закрыть меню контактов' : 'Открыть меню контактов'}
                aria-expanded={isOpen}
            >
                <svg className="h-8 w-8 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 5v14M5 12h14" />
                </svg>
            </button>
        </div>
    );
}

export default ContactLauncher;
