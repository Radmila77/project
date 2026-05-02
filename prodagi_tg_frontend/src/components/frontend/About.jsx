import React from 'react';
import AboutCasesSection from '../About/AboutCasesSection.jsx';
import AboutEducationTrustSection from '../About/AboutEducationTrustSection.jsx';
import AboutFinalSection from '../About/AboutFinalSection.jsx';
import AboutHeroSection from '../About/AboutHeroSection.jsx';
import AboutTimelineSection from '../About/AboutTimelineSection.jsx';

const About = () => {
    return (
        <main className="relative overflow-hidden bg-[#f7f3ef]">
            <AboutHeroSection />
            <AboutCasesSection />
            <AboutTimelineSection />
            <AboutEducationTrustSection />
            <AboutFinalSection />
        </main>
    );
};

export default About;
