import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function OpenGraphChecker() {
  const [url, setUrl] = useState("");
  const [openGraphData, setOpenGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL_OPEN_GRAPH_CHECKER;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  const isValidUrl = (url) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url) {
      toast.error("Please enter a URL!");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL!");
      return;
    }

    setLoading(true);
    setOpenGraphData(null);

    try {
      const response = await axios.get(apiUrl, {
        params: { url: url },
        headers: {
          "x-rapidapi-key": apiKey || "",
          "x-rapidapi-host": apiHost || "",
        },
      });

      setOpenGraphData(response.data);
      toast.success("Open Graph data fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Open Graph data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    "og:title": "🔍 No Title Available",
    "og:description": "💡 No Description Available",
    "og:url": "🌍 No URL Available",
    "og:site_name": "🌐 No Site Name Available",
    "og:image": "📷 No Image Available",
    "og:type": "📝 No Type Available",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">Open Graph Checker</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Check Open Graph Data</h2>
          <p className="text-gray-400 mb-4">
            Enter a URL to analyze its Open Graph data and improve SEO
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-grow bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="Enter URL (e.g., https://google.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Loading..." : "Check"}
              </button>
            </div>
          </form>

          {openGraphData && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                {/* Full-width image */}
                <img
                  src={openGraphData["og:image"] || defaultData["og:image"]}
                  alt="Open Graph"
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Website details */}
                <div className="pt-4">
                  <p className="text-xl font-semibold">
                    {openGraphData["og:title"] || defaultData["og:title"]}
                  </p>
                  <p className="text-sm text-gray-400">
                    {openGraphData["og:description"] ||
                      defaultData["og:description"]}
                  </p>
                  <p className="mt-2 text-blue-400 hover:underline">
                    <a
                      href={openGraphData["og:url"] || defaultData["og:url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {openGraphData["og:url"] || defaultData["og:url"]}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
