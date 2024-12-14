import React from "react";
import SeoTools from "../components/Tools/SeoTools";
import WritingTools from "../components/Tools/WritingTools";
import { Helmet } from "react-helmet-async";

function AllTools() {
  return (
    <>
      <Helmet>
        <title>All Tools | OptiSEO</title>
        <meta
          name="description"
          content="Welcome to OptiSEO, your ultimate all-in-one SEO tool for improving website performance and ranking."
        />
      </Helmet>
      <SeoTools />
      <WritingTools />
    </>
  );
}

export default AllTools;
