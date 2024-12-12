import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function PageSizeChecker() {
  const [url, setUrl] = useState("");
  const [pageSize, setPageSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL_PAGE_SIZE_CHECKER;
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
    setPageSize(null);

    try {
      const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`, {
        headers: {
          "x-rapidapi-key": apiKey || "",
          "x-rapidapi-host": apiHost || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch page size");
      }

      const data = await response.json();
      setPageSize(data);
      toast.success("Page size fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch page size. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (kb) => {
    if (kb <= 100) return { status: "Good", color: "bg-green-500" };
    if (kb <= 300) return { status: "Moderate", color: "bg-yellow-500" };
    return { status: "Bad", color: "bg-red-500" };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">Page Size Checker</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Check Your Page Size</h2>
          <p className="text-gray-400 mb-4">
            Enter a URL to analyze its page size and performance
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

          {pageSize && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Page Size Details</h3>
                {/* <p>
                  <span className="font-medium">Link:</span>{" "}
                  <a
                    href={pageSize.link}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pageSize.link}
                  </a>
                </p> */}
                <p>
                  <span className="font-medium">Size:</span> {pageSize.bytes}{" "}
                  bytes ({pageSize.kb} KB)
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Performance</h3>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`text-xs font-semibold inline-block py-1 px-2 mb-3 uppercase rounded-full text-white ${
                          getStatus(parseFloat(pageSize.kb)).color
                        }`}
                      >
                        {getStatus(parseFloat(pageSize.kb)).status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-white">
                        {Math.min(parseFloat(pageSize.kb), 500).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-lg">
                    <div
                      className={`h-full rounded-lg ${
                        getStatus(parseFloat(pageSize.kb)).color
                      }`}
                      style={{
                        width: `${Math.min(
                          (parseFloat(pageSize.kb) / 500) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Optimize images and use modern formats like WebP</li>
                  <li>Minify CSS, JavaScript, and HTML</li>
                  <li>Leverage browser caching</li>
                  <li>Use a Content Delivery Network (CDN)</li>
                  <li>Enable GZIP compression</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
