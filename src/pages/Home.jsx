import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import FeatureSection from "../components/Home/FeatureSection";
import Testimonial from "../components/Home/Testimonial";

function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <Testimonial />
    </>
  );
}

export default Home;
