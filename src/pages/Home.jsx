import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import FeatureSection from "../components/Home/FeatureSection";
import Testimonial from "../components/Home/Testimonial";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | OptiSEO</title>
        <meta
          name="description"
          content="Welcome to OptiSEO, the ultimate platform for all-in-one SEO tools designed to help you enhance your website's performance and achieve top search engine rankings."
        />
        <link rel="canonical" href="https://optiseo.vercel.app/" />
        <meta
          name="keywords"
          content="SEO tools, website optimization, improve SEO ranking, all-in-one SEO solutions"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Home | OptiSEO" />
        <meta
          property="og:description"
          content="Explore OptiSEO's suite of tools designed to optimize your website's performance and boost your SEO rankings."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://optiseo.vercel.app/" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | OptiSEO" />
        <meta
          name="twitter:description"
          content="Optimize your website's performance and achieve higher search engine rankings with OptiSEO's all-in-one SEO tools."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* Favicon */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

      <HeroSection />
      <FeatureSection />
      <Testimonial />
    </>
  );
}

export default Home;
