import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipboardCopy } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>Keyword Density Checker | OptiSEO</title>
        <meta
          name="description"
          content="Analyze the keyword density of any webpage with OptiSEO's Keyword Density Checker. Optimize your content for better SEO performance by ensuring the right keyword density."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/keyword-density-checker"
        />
        <meta
          name="keywords"
          content="keyword density checker, SEO tools, keyword analysis, content optimization, SEO content, keyword frequency"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Keyword Density Checker | OptiSEO" />
        <meta
          property="og:description"
          content="Check the keyword density of any webpage with OptiSEO's Keyword Density Checker tool. Ensure your content is optimized for SEO by balancing keyword usage."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/keyword-density-checker"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Keyword Density Checker | OptiSEO"
        />
        <meta
          name="twitter:description"
          content="Analyze the keyword density of your content with OptiSEO's Keyword Density Checker to ensure optimal SEO performance and avoid keyword stuffing."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* Favicon */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

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
                      <p className="text-sm text-gray-500">
                        Count: {item.count}
                      </p>
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
    </>
  );
};

export default KeyWordDensityChecker;
