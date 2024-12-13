import React from "react";

function ImportantText({ title, bgColour, colour }) {
  return (
    <div
      className={`inline-block px-3 py-1 rounded-lg ${bgColour} ${colour} font-medium`}
    >
      {title}
    </div>
  );
}

export default ImportantText;
