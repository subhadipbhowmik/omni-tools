import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipboardCopy } from "lucide-react";

const KeywordSuggestion = () => {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch environment variables
  const apiUrl = import.meta.env.VITE_API_URL_KEYWORD_SUGGESTION_TOOL;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!query) {
      toast.error("Please enter a query!");
      return;
    }

    setLoading(true);
    setKeywords([]);

    const options = {
      method: "GET",
      url: apiUrl,
      params: { query },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);

      // Check if keywords data exists and is an array
      const fetchedKeywords = response.data.keywords || [];
      setKeywords(fetchedKeywords);

      if (fetchedKeywords.length === 0) {
        toast.error(
          "Sorry, this keyword does not have enough keyword suggestions."
        );
      } else {
        toast.success("Keywords fetched successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch keywords. Please try again.");
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
      // Fallback for unsupported browsers
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
          <h1 className="text-4xl font-bold">Keyword Suggestion Tool</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Find Relevant Keywords</h2>
          <p className="text-gray-400 mb-4">
            Enter a query to get keyword suggestions.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input and Button on separate lines */}
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
              placeholder="Enter query (e.g., best programming language 2024)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Loading..." : "Keywords"}
            </button>
          </form>

          {keywords.length > 0 ? (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-800">
                <h3 className="text-xl font-semibold text-blue-400">
                  Suggested Keywords
                </h3>
                <ul className="mt-4 space-y-4">
                  {keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-700 p-4 border border-gray-600 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => copyToClipboard(keyword)}
                        className="text-blue-400 hover:text-blue-500"
                        title="Copy to clipboard"
                      >
                        <ClipboardCopy className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center text-gray-400">
              <p>Sorry, no keywords found for your query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordSuggestion;
