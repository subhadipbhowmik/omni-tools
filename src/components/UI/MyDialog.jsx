import React from "react";
import { X } from "lucide-react"; // Import the Lucide close icon
import toast from "react-hot-toast";

function MyDialog({ isOpen, closeDialog }) {
  if (!isOpen) return null; // If dialog is closed, return nothing

  const siteUrl = "https://optiseo.vercel.app/";
  function copyUrlText() {
    navigator.clipboard.writeText(siteUrl);
    toast.success("URL copied to clipboard!");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg max-w-sm w-full">
        {/* Close Button */}
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 p-2 rounded-full bg-indigo-600 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Share OptiSEO
        </h2>

        {/* QR Code */}
        <div className="text-center mb-6">
          <img
            src="optiseo-qr.png"
            alt="QR Code"
            className="w-48 h-48 mx-auto rounded-lg border-2 border-indigo-600"
          />
        </div>

        {/* Bio Link Section */}
        <div className="flex items-center mt-6 gap-1">
          <input
            type="text"
            value={siteUrl}
            className="flex-1  px-4 py-2 border-2  border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            readOnly
          />
          <button
            onClick={copyUrlText}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyDialog;
