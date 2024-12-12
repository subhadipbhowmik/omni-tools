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

    // Axios request options
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Link Analyzer</h1>

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex items-center border-b border-gray-300">
          <input
            type="text"
            className="w-full py-2 px-4 rounded-lg text-gray-900 focus:outline-none"
            placeholder="Enter URL (e.g., https://world.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : "Analyze Links"}
        </button>
      </form>

      {/* Display Link Data */}
      {linkData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900">Link Analysis</h2>
          <div className="mt-4 text-left">
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

            <h3 className="mt-6 text-lg font-semibold">Internal Links</h3>
            <ul>
              {linkData.internal_links.map((link, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <strong>Link:</strong> {link.link}
                  </p>
                  <p>
                    <strong>Follow Type:</strong> {link.follow_type}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-semibold">External Links</h3>
            <ul>
              {linkData.external_links.map((link, index) => (
                <li key={index} className="mb-2">
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
      )}
    </div>
  );
};

export default LinkAnalyzer;
