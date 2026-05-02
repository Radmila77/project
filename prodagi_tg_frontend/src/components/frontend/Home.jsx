import React from 'react';
import Banner from "../Home/Banner.jsx";
import AboutHome from "../Home/AboutHome.jsx";
import WorkshopHome from "../Home/WorkshopHome.jsx";
// import NeuroHome from "../Home/NeuroHome.jsx";
import FaqHome from "../Home/FaqHome.jsx";
import ReviewsHome from "../Home/ReviewsHome.jsx";

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutHome/>
            <WorkshopHome/>
            {/* <NeuroHome/> */}
            <ReviewsHome/>
            <FaqHome/>
        </div>
    );
};

export default Home;
