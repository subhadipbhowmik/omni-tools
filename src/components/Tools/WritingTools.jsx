import React from "react";
import writingToolsData from "../../assets/data/writingToolsData";
import ToolsCard from "./ToolsCard";
import "../../pages/AllTools.css";

function WritingTools() {
  return (
    <>
      <section className="bg-gray-50 py-8 px-6 sm:px-8 tools-container">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore Our Powerful Writing Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
            {writingToolsData.map((item) => (
              <ToolsCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                pageLink={item.pageLink}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WritingTools;
