import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const LinkAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [linkData, setLinkData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch environment variables
  const apiUrl = import.meta.env.VITE_API_URL_LINK_ANALYZER;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // Validate URL format
  const isValidUrl = (url) => {
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };

  // Handle form submission
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
    setLinkData(null);

    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        url: url,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      setLinkData(response.data.data); // Access the `data` field in the API response
      toast.success("Link analysis fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch link analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">Link Analyzer</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Analyze Your Links</h2>
          <p className="text-gray-400 mb-4">
            Enter a URL to analyze its internal and external links.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-grow bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="Enter URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Loading..." : "Analyze"}
              </button>
            </div>
          </form>

          {linkData && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400">
                  Link Analysis
                </h3>
                <div className="mt-4 space-y-6">
                  <p>
                    <strong>Total Links:</strong> {linkData.total_links}
                  </p>
                  <p>
                    <strong>Total Internal Links:</strong>{" "}
                    {linkData.total_internal_links}
                  </p>
                  <p>
                    <strong>Total External Links:</strong>{" "}
                    {linkData.total_external_links}
                  </p>
                  <p>
                    <strong>Total Internal Nofollow Links:</strong>{" "}
                    {linkData.total_internal_nofollow}
                  </p>
                  <p>
                    <strong>Total External Nofollow Links:</strong>{" "}
                    {linkData.total_external_nofollow}
                  </p>

                  <h4 className="mt-6 text-lg font-semibold text-indigo-300">
                    Internal Links
                  </h4>
                  <ul className="space-y-3">
                    {linkData.internal_links.map((link, index) => (
                      <li
                        key={index}
                        className="bg-gray-700 p-4 border border-gray-600 rounded-lg hover:bg-gray-600 transition duration-300"
                      >
                        <p>
                          <strong>Link:</strong> {link.link}
                        </p>
                        <p>
                          <strong>Follow Type:</strong> {link.follow_type}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-6 text-lg font-semibold text-indigo-300">
                    External Links
                  </h4>
                  <ul className="space-y-3">
                    {linkData.external_links.map((link, index) => (
                      <li
                        key={index}
                        className="bg-gray-700 p-4 border border-gray-600 rounded-lg hover:bg-gray-600 transition duration-300"
                      >
                        <p>
                          <strong>Link:</strong> {link.link}
                        </p>
                        <p>
                          <strong>Follow Type:</strong> {link.follow_type}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkAnalyzer;
