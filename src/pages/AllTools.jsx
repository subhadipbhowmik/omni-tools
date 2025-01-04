import React from "react";
import SeoTools from "../components/Tools/SeoTools";
import WritingTools from "../components/Tools/WritingTools";
import TrainTools from "../components/Tools/TrainTools";
import { Helmet } from "react-helmet-async";

function AllTools() {
  return (
    <>
      <Helmet>
        <title>Tools | OmniTools</title>
        <meta
          name="description"
          content="Explore OptiSEO's powerful suite of SEO tools designed to optimize your website's performance and improve your search engine rankings. Find tools like Domain Age Checker, Keyword Rank Checker, and more."
        />
        <link rel="canonical" href="https://optiseo.vercel.app/tools" />
        <meta
          name="keywords"
          content="SEO tools, domain age checker, DNS record checker, link analyzer, page size checker, open graph checker, keyword suggestion, keyword rank checker, keyword density checker, adsense calculator, DA PA checker, plagiarism checker, grammar checker, online text editor"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Tools | OptiSEO" />
        <meta
          property="og:description"
          content="Discover OptiSEO's comprehensive suite of SEO tools to enhance your website's performance. Tools include domain age checker, keyword suggestion, and more."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://optiseo.vercel.app/tools" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tools | OptiSEO" />
        <meta
          name="twitter:description"
          content="Enhance your website's SEO with OptiSEO's range of SEO tools, including Domain Age Checker, Keyword Rank Checker, and more."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* Favicon */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

      <SeoTools />
      <WritingTools />
      <TrainTools />
    </>
  );
}

export default AllTools;
