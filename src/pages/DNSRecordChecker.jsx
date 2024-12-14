import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>DNS Record Checker | OptiSEO</title>
        <meta
          name="description"
          content="Check DNS records for any domain using OptiSEO's DNS Record Checker tool. Verify your DNS settings and ensure your domain is correctly configured."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/dns-record-checker"
        />
        <meta
          name="keywords"
          content="DNS record checker, SEO tools, domain DNS, DNS settings, domain configuration, website analysis"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="DNS Record Checker | OptiSEO" />
        <meta
          property="og:description"
          content="Verify DNS records and ensure proper domain configuration with OptiSEO's DNS Record Checker tool. Improve your site's performance with accurate DNS settings."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/dns-record-checker"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DNS Record Checker | OptiSEO" />
        <meta
          name="twitter:description"
          content="Check and verify DNS records for any domain with OptiSEO's DNS Record Checker tool. Ensure correct DNS configuration for better website performance."
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
            <h1 className="text-4xl font-bold">DNS Record Checker</h1>
          </header>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold">Check DNS Records</h2>
            <p className="text-gray-400 mb-4">
              Enter a domain to fetch its DNS records.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Target Domain
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                  placeholder="Enter domain (e.g., google.com)"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Loading..." : "Check"}
              </button>
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
                              <strong>IP:</strong>{" "}
                              {record.ip || defaultRecord.ip}
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
    </>
  );
}

export default DNSRecordChecker;
