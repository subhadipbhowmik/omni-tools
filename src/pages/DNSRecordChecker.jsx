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

    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        domain: domain,
        record_type: "A",
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

  const defaultRecord = {
    host: "🔍 No Host Available",
    ip: "💡 No IP Address",
    type: "N/A",
    class: "N/A",
    ttl: "N/A",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-12">
          <h1 className="text-4xl font-bold">DNS Record Checker</h1>
        </header>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Check DNS Records</h2>
          <p className="text-gray-400 mb-4">
            Enter a domain to fetch its DNS records.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-grow bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                placeholder="Enter domain (e.g., google.com)"
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

          {dnsRecords && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400">
                  DNS Records
                </h3>
                <div className="mt-4 space-y-6">
                  {dnsRecords.length ? (
                    dnsRecords.map((record, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition duration-300"
                      >
                        <h4 className="text-lg font-semibold text-blue-300">
                          {record.host || defaultRecord.host}
                        </h4>
                        <ul className="text-gray-300 space-y-1 mt-2">
                          <li>
                            <strong>IP:</strong> {record.ip || defaultRecord.ip}
                          </li>
                          <li>
                            <strong>Type:</strong>{" "}
                            {record.type || defaultRecord.type}
                          </li>
                          <li>
                            <strong>Class:</strong>{" "}
                            {record.class || defaultRecord.class}
                          </li>
                          <li>
                            <strong>TTL:</strong>{" "}
                            {record.ttl || defaultRecord.ttl}
                          </li>
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No records found.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DNSRecordChecker;
