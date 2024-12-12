import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function DomainAgeChecker() {
  const [domain, setDomain] = useState("");
  const [domainDetails, setDomainDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch environment variables
  const apiUrl = import.meta.env.VITE_API_URL_DOMAIN_AGE_CHECKER;
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

  // Validate domain format
  const isValidDomain = (domain) => {
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!domain) {
      toast.error("Please enter a domain!");
      return;
    }

    if (!isValidDomain(domain)) {
      toast.error("Please enter a valid domain!");
      return;
    }

    setLoading(true);
    setDomainDetails(null);

    try {
      const response = await axios.get(apiUrl, {
        params: { domain },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      });

      setDomainDetails(response.data);
      toast.success("Domain details fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch domain details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    domain_name: "🔍 No Domain Available",
    age: "💡 No Age Available",
    creation_date: "📅 No Creation Date",
    updated_date: "📅 No Updated Date",
    expiration_date: "📅 No Expiration Date",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">Domain Age Checker</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Check Domain Age</h2>
          <p className="text-gray-400 mb-4">
            Enter a domain to analyze its age and other related details.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-grow bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="Enter domain (e.g., facebook.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
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

          {domainDetails && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400">
                  Domain Details
                </h3>
                <ul className="mt-4 space-y-2 text-gray-200">
                  <li>
                    <strong>Domain Name:</strong>{" "}
                    {domainDetails.domain_name || defaultData.domain_name}
                  </li>
                  <li>
                    <strong>Age:</strong> {domainDetails.age || defaultData.age}{" "}
                    years
                  </li>
                  <li>
                    <strong>Creation Date:</strong>{" "}
                    {domainDetails.creation_date
                      ? new Date(
                          domainDetails.creation_date * 1000
                        ).toLocaleDateString()
                      : defaultData.creation_date}
                  </li>
                  <li>
                    <strong>Last Updated:</strong>{" "}
                    {domainDetails.updated_date
                      ? new Date(
                          domainDetails.updated_date * 1000
                        ).toLocaleDateString()
                      : defaultData.updated_date}
                  </li>
                  <li>
                    <strong>Expiration Date:</strong>{" "}
                    {domainDetails.expiration_date
                      ? new Date(
                          domainDetails.expiration_date * 1000
                        ).toLocaleDateString()
                      : defaultData.expiration_date}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DomainAgeChecker;
