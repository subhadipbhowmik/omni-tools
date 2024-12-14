import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipboardCopy } from "lucide-react";

const KeyWordDensityChecker = () => {
  const [keywordData, setKeywordData] = useState([]);
  const [url, setUrl] = useState("https://google.com");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL_KEYWORD_DENSITY_CHECKER;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // Fetch data from the API when the button is clicked
  const fetchData = async () => {
    if (!url) {
      toast.error("Please enter a valid URL!");
      return;
    }

    setLoading(true);
    setKeywordData([]);

    const options = {
      method: "GET",
      url: apiUrl,
      params: { url },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      setKeywordData(response.data);

      if (response.data.length === 0) {
        toast.error("No keyword data found for this URL.");
      } else {
        toast.success("Keyword density fetched successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch keyword density. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy keyword to clipboard
  const copyToClipboard = (keyword) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(keyword)
        .then(() => toast.success(`Copied: ${keyword}`))
        .catch((err) => {
          console.error("Clipboard error:", err);
          toast.error("Failed to copy to clipboard.");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = keyword;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success(`Copied: ${keyword}`);
      } catch (err) {
        console.error("Clipboard fallback error:", err);
        toast.error("Failed to copy to clipboard.");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">Keyword Density Checker</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">
            Enter URL for Keyword Density
          </h2>
          <p className="text-gray-400 mb-4">
            Provide a URL to analyze keyword density.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
            className="space-y-4"
          >
            {/* Input for URL */}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
              placeholder="Enter URL (e.g., https://google.com)"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Loading..." : "Check Density"}
            </button>
          </form>

          {keywordData.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {keywordData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                      {item.keyword}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.keyword)}
                      className="text-blue-400 hover:text-blue-500"
                      title="Copy to clipboard"
                    >
                      <ClipboardCopy className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Count: {item.count}</p>
                    <p className="text-sm text-gray-500">
                      Percentage: {item.percent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center text-gray-400">
              <p>Sorry, no data found for the given URL.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyWordDensityChecker;
