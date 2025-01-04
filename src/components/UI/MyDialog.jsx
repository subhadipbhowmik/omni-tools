import React from "react";
import { X } from "lucide-react"; // Import the Lucide close icon
import toast from "react-hot-toast";

function MyDialog({ isOpen, closeDialog }) {
  if (!isOpen) return null; // If dialog is closed, return nothing

  const siteUrl = "omnitools.vercel.app";
  function copyUrlText() {
    navigator.clipboard.writeText(siteUrl);
    toast.success("URL copied to clipboard!");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-8">
      <div className="relative bg-white p-6 rounded-lg max-w-sm w-full">
        {/* Close Button */}
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 p-2 rounded-full bg-indigo-600 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Share OmniTools
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
        <div className="text-center">
          <p className="py-2 border-2  border-indigo-300 rounded-lg">
            {siteUrl}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyDialog;
