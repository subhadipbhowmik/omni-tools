import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DomainAgeChecker() {
  const [domain, setDomain] = useState("");
  const [domainDetails, setDomainDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission to fetch domain details
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!domain) {
      toast.error("Please enter a domain!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://seo-api2.p.rapidapi.com/domain-age-checker",
        {
          params: { domain },
          headers: {
            "x-rapidapi-key":
              "043c9c743emsh4b47b9432d7c746p1d2cf7jsn4c64974428a6",
            "x-rapidapi-host": "seo-api2.p.rapidapi.com",
          },
        }
      );

      // Save domain details to state
      setDomainDetails(response.data);
      toast.success("Domain details fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch domain details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Domain Age Checker
      </h1>

      {/* Domain Input Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex items-center border-b border-gray-300">
          <input
            type="text"
            className="w-full py-2 px-4 rounded-lg text-gray-900 focus:outline-none"
            placeholder="Enter domain (e.g., facebook.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Domain Age"}
        </button>
      </form>

      {/* Display Domain Details */}
      {domainDetails && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Domain Details
          </h2>
          <div className="mt-4 text-left">
            <p>
              <strong>Domain Name:</strong> {domainDetails.domain_name}
            </p>
            <p>
              <strong>Age:</strong> {domainDetails.age}
            </p>
            <p>
              <strong>Creation Date:</strong>{" "}
              {new Date(
                domainDetails.creation_date * 1000
              ).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(domainDetails.updated_date * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Expiration Date:</strong>{" "}
              {new Date(
                domainDetails.expiration_date * 1000
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DomainAgeChecker;
