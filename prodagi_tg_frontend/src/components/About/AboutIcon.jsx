import React from 'react';
import PropTypes from 'prop-types';

const AboutIcon = ({ type, className = "h-5 w-5" }) => {
    const commonProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className
    };

    if (type === "case") {
        return (
            <svg {...commonProps}>
                <path d="M8 7V5.8C8 4.806 8.806 4 9.8 4H14.2C15.194 4 16 4.806 16 5.8V7" stroke="currentColor" strokeWidth="1.8" />
                <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 11.5H20" stroke="currentColor" strokeWidth="1.8" />
            </svg>
        );
    }

    if (type === "growth") {
        return (
            <svg {...commonProps}>
                <path d="M5 17L10 12L13 15L19 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 9H19V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === "education") {
        return (
            <svg {...commonProps}>
                <path d="M3.5 8.5L12 4L20.5 8.5L12 13L3.5 8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7 10.8V14.6C7 15.3 9.2 17 12 17C14.8 17 17 15.3 17 14.6V10.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg {...commonProps}>
            <path d="M12 4.5L14.318 9.196L19.5 9.95L15.75 13.604L16.635 18.76L12 16.324L7.365 18.76L8.25 13.604L4.5 9.95L9.682 9.196L12 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
    );
};

AboutIcon.propTypes = {
    type: PropTypes.oneOf(["case", "growth", "education", "star"]).isRequired,
    className: PropTypes.string
};

export default AboutIcon;
