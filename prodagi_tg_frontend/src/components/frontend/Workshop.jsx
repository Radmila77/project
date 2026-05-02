import React from 'react';
import WorkshopHero from '../Workshop/WorkshopHero.jsx';
import WorkshopInfo from '../Workshop/WorkshopInfo.jsx';
import WorkshopPricing from '..//Workshop/WorkshopPricing';
import WorkshopModules from "src/components/Workshop/WorkshopModules.jsx";
import WorkshopGuarantee from "src/components/Workshop/WorkshopGuarantee.jsx";

const Workshop = () => {
    return (
        <main className="bg-white min-h-screen relative overflow-hidden">

            <WorkshopHero />
            <WorkshopInfo />
            <WorkshopPricing />
            <WorkshopModules />
            <WorkshopGuarantee />

        </main>
    );
};

export default Workshop;
