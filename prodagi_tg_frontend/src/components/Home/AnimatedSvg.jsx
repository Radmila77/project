import React from 'react';
import { motion } from 'motion/react';
import { ReactComponent as Circle } from 'src/assets/krug-banner.svg';

const AnimatedSvg = () => {
    return (
        <>
            <motion.div
                className="banner-circle group"
                whileHover={{ rotate: 6, scale: 1.03 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Circle className="w-[420px] md:w-[520px] h-auto" />
            </motion.div>

            <style>{`
                .banner-circle svg path {
                    transition: transform 0.7s ease, opacity 0.7s ease;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                .banner-circle:hover svg path:nth-of-type(odd) {
                    transform: translateX(10px);
                    opacity: 0.65;
                }

                .banner-circle:hover svg path:nth-of-type(even) {
                    transform: translateX(-10px);
                    opacity: 0.2;
                }
            `}</style>
        </>
    );
};

export default AnimatedSvg;
