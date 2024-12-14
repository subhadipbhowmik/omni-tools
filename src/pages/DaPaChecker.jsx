import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const DaPaChecker = () => {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const apiUrl = "https://domain-da-pa-check.p.rapidapi.com/";
  const apiKey = "043c9c743emsh4b47b9432d7c746p1d2cf7jsn4c64974428a6";
  const apiHost = "domain-da-pa-check.p.rapidapi.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!target) {
      toast.error("Please enter a target domain!");
      return;
    }

    setLoading(true);
    setResult(null);

    const options = {
      method: "GET",
      url: apiUrl,
      params: { target },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      setResult(response.data.body);
      toast.success("DA/PA check successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch DA/PA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>DA/PA Checker | OptiSEO</title>
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="flex items-center justify-center mb-12">
            <h1 className="text-4xl font-bold">Domain Authority Checker</h1>
          </header>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold">
              Check Domain Authority (DA/PA)
            </h2>
            <p className="text-gray-400 mb-4">
              Enter a domain to check its authority and other SEO metrics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Target Domain
                </label>
                <input
                  type="text"
                  name="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                  placeholder="e.g., www.google.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Checking..." : "Check DA/PA"}
              </button>
            </form>

            {result && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* DA Score */}
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Domain Authority (DA)
                  </h3>
                  <p className="text-sm text-gray-400">{result.da_score}</p>
                </div>

                {/* PA Score */}
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Page Authority (PA)
                  </h3>
                  <p className="text-sm text-gray-400">{result.pa_score}</p>
                </div>

                {/* Spam Score */}
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Spam Score
                  </h3>
                  <p className="text-sm text-gray-400">{result.spam_score}%</p>
                </div>

                {/* Total Backlinks */}
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Total Backlinks
                  </h3>
                  <p className="text-sm text-gray-400">
                    {result.total_backlinks.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DaPaChecker;
