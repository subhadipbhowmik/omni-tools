import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, FileText, ClipboardPaste } from "lucide-react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_PLAGARISM_HOST;
  const apiUrl = import.meta.env.VITE_API_URL_PLAGARISM_CHECKER;

  console.table({
    apiKey,
    apiHost,
    apiUrl,
  });

  function pasteText() {
    navigator.clipboard.readText().then((text) => {
      setText(text);
    });
  }

  const handleCheckPlagiarism = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text.");
      return;
    }

    setLoading(true);
    setResults(null);
    setError(null);

    const options = {
      method: "POST",
      url: apiUrl,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
        "Content-Type": "application/json",
      },
      data: {
        text: text,
        language: "en",
        includeCitations: false,
        scrapeSources: false,
      },
    };

    try {
      const response = await axios.request(options);
      setResults(response.data);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Plagiarism Checker | OptiSEO</title>
        <meta
          name="description"
          content="Check for plagiarism in your content with OptiSEO's Plagiarism Checker. Ensure your work is original and free of copied content to maintain SEO integrity."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/plagiarism-checker"
        />
        <meta
          name="keywords"
          content="plagiarism checker, SEO tools, content originality, plagiarism detection, check plagiarism"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shubhadip Bhowmik" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Plagiarism Checker | OptiSEO" />
        <meta
          property="og:description"
          content="Check your content for plagiarism with OptiSEO's Plagiarism Checker tool. Ensure your work is original and improves your SEO ranking."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/plagiarism-checker"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plagiarism Checker | OptiSEO" />
        <meta
          name="twitter:description"
          content="Check your content for plagiarism with OptiSEO's Plagiarism Checker to maintain originality and SEO integrity."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="https://x.com/myselfshubhadip" />

        {/* Favicon */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gradient">
              Plagiarism Checker
            </h1>
          </header>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">
              Check for Plagiarism
            </h2>
            <button className="flex items-center" onClick={pasteText}>
              <ClipboardPaste className="w-6 h-6 m-2 mb-2" />
              Click to Paste Text
            </button>

            {/* Input Text Area */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              rows={6}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleCheckPlagiarism}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              {loading ? "Checking..." : "Check for Plagiarism"}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-red-500 flex items-center">
                <XCircle className="mr-2" />
                {error}
              </div>
            )}

            {/* Results Section */}
            {results && (
              <div className="mt-8">
                {results.percentPlagiarism === 0 ? (
                  <div className="bg-green-600 p-4 rounded-lg text-center text-white">
                    <CheckCircle className="inline mr-2" />
                    No plagiarism detected! 🎉
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 text-xl font-semibold text-blue-400">
                      <FileText className="inline mr-2" />
                      Plagiarism Results
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg mb-6">
                      <p className="text-gray-300">
                        <strong>Plagiarism Percentage:</strong>{" "}
                        <span className="text-blue-400 text-2xl font-semibold">
                          {results.percentPlagiarism}%
                        </span>
                      </p>
                    </div>

                    {results.sources.length > 0 && (
                      <div className="space-y-6">
                        {results.sources.map((source, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 rounded-lg transition-all"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:underline font-semibold text-lg"
                              >
                                <span className="inline-block mr-2">🔗</span>
                                {source.title}
                              </a>
                              <span className="text-gray-400 font-medium">
                                {source.matches.length}{" "}
                                {source.matches.length === 1
                                  ? "Match"
                                  : "Matches"}
                              </span>
                            </div>

                            <div className="space-y-4">
                              {source.matches.map((match, i) => (
                                <div
                                  key={i}
                                  className="bg-gray-700 p-4 rounded-lg shadow-sm"
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="text-sm font-medium text-gray-200">
                                      <strong>Match {i + 1}:</strong>
                                    </div>
                                    <div className="text-sm text-yellow-300 font-bold">
                                      Score: {match.score.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="text-gray-300">
                                    <span>{match.matchText}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlagiarismChecker;
