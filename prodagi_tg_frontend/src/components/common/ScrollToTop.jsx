import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const elementId = hash.replace('#', '');

            const scrollToHashTarget = () => {
                const element = document.getElementById(elementId);

                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            };

            // Wait for the route to render before trying to find the anchor target.
            requestAnimationFrame(scrollToHashTarget);
            return;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
