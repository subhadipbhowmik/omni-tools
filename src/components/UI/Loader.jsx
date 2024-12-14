import React from "react";
import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
      <div className="bg-white rounded-sm w-[80px] h-[80px] flex justify-center items-center">
        {/* Choose your preferred loading indicator: */}
        {/* Option 1: Lucide Icon */}
        <LoaderIcon
          name="loader"
          className="animate-spin text-primary w-12 h-12"
        />

        {/* Option 2: Tailwind CSS Spinner */}
        {/* <div className="w-16 h-16 border-4 border-t-4 border-primary border-opacity-30 border-solid rounded-full animate-spin" /> */}
      </div>
    </div>
  );
};

export default Loader;
