import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdsenseCalculator = () => {
  const [formData, setFormData] = useState({
    impressions: "",
    ctr: "",
    cpc: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL_ADSENSE_CALCULATOR;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { impressions, ctr, cpc } = formData;

    // Validation
    if (!impressions || !ctr || !cpc) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setResult(null);

    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        impressions,
        ctr,
        cpc,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      toast.success("Calculation successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to calculate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">AdSense Calculator</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">
            Calculate Your AdSense Revenue
          </h2>
          <p className="text-gray-400 mb-4">
            Enter the required details to estimate your revenue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Daily Page Impressions
              </label>
              <input
                type="number"
                name="impressions"
                value={formData.impressions}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="e.g., 1600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Click Through Rate (%)
              </label>
              <input
                type="number"
                name="ctr"
                value={formData.ctr}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="e.g., 24.5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Cost Per Click ($)
              </label>
              <input
                type="number"
                name="cpc"
                value={formData.cpc}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="e.g., 3.2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </form>

          {result && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Daily Revenue */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                <h3 className="text-lg font-semibold text-blue-400">
                  Daily Revenue
                </h3>
                <p className="text-sm text-gray-400">
                  Revenue: ${result.daily.revenue}
                </p>
                <p className="text-sm text-gray-400">
                  Clicks: {result.daily.clicks}
                </p>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                <h3 className="text-lg font-semibold text-blue-400">
                  Monthly Revenue
                </h3>
                <p className="text-sm text-gray-400">
                  Revenue: ${result.monthly.revenue}
                </p>
                <p className="text-sm text-gray-400">
                  Clicks: {result.monthly.clicks}
                </p>
              </div>

              {/* Annual Revenue */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:bg-gray-600 transition duration-300">
                <h3 className="text-lg font-semibold text-blue-400">
                  Annual Revenue
                </h3>
                <p className="text-sm text-gray-400">
                  Revenue: ${result.annually.revenue}
                </p>
                <p className="text-sm text-gray-400">
                  Clicks: {result.annually.clicks}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsenseCalculator;
