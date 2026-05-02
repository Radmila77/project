import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="relative mb-8 mt-10 w-full overflow-hidden md:mt-12">

            <div
                className="
                    inline-flex items-center
                    relative
                    -left-3 md:-left-10
                    max-w-[calc(100%-0.75rem)] md:max-w-none
                    py-3.5 md:py-6
                    pl-7 md:pl-24
                    pr-7 md:pr-20
                    bg-custom-bkred
                    rounded-r-full
                    shadow-xl
                "
            >
                <h2 className="
                    text-lg sm:text-xl md:text-3xl
                    font-exo font-bold
                    text-white
                    uppercase
                    tracking-[0.04em] md:tracking-wide
                    break-words
                ">
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default SectionHeader;
