import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function DNSRecordChecker() {
  const [domain, setDomain] = useState("");
  const [dnsRecords, setDnsRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch environment variables
  const apiUrl = import.meta.env.VITE_API_URL_DNS_RECORD_CHECKER;
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
    setDnsRecords(null);

    // Axios request options
    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        domain: domain,
        record_type: "A", // Always use 'A' as the record type
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      setDnsRecords(response.data);
      toast.success("DNS records fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch DNS records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        DNS Record Checker
      </h1>

      {/* Domain Input Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex items-center border-b border-gray-300">
          <input
            type="text"
            className="w-full py-2 px-4 rounded-lg text-gray-900 focus:outline-none"
            placeholder="Enter domain (e.g., google.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get DNS Records"}
        </button>
      </form>

      {/* Display DNS Records */}
      {dnsRecords && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900">DNS Records</h2>
          <div className="mt-4 text-left">
            {dnsRecords.map((record, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Host:</strong> {record.host}
                </p>
                <p>
                  <strong>Class:</strong> {record.class}
                </p>
                <p>
                  <strong>TTL:</strong> {record.ttl}
                </p>
                <p>
                  <strong>Type:</strong> {record.type}
                </p>
                <p>
                  <strong>IP:</strong> {record.ip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DNSRecordChecker;
