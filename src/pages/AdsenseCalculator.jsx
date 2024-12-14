import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>AdSense Calculator | OptiSEO</title>
        <meta
          name="description"
          content="Estimate your AdSense revenue potential with OptiSEO's AdSense Calculator. Calculate potential earnings based on your website's traffic and ad performance."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/adsense-calculator"
        />
        <meta
          name="keywords"
          content="AdSense calculator, SEO tools, ad revenue, AdSense earnings, website traffic, earnings estimate"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="AdSense Calculator | OptiSEO" />
        <meta
          property="og:description"
          content="Use OptiSEO's AdSense Calculator to estimate potential ad revenue based on your website's traffic and ad performance. Optimize your site for better earnings."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/adsense-calculator"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AdSense Calculator | OptiSEO" />
        <meta
          name="twitter:description"
          content="Estimate your AdSense earnings with OptiSEO's AdSense Calculator. Calculate potential revenue based on traffic and ad performance to optimize your website."
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
    </>
  );
};

export default AdsenseCalculator;
