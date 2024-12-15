import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { Train, Calendar, MapPin, XCircle, FileText } from "lucide-react";

function PNRStatusChecker() {
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrDetails, setPnrDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_PNR_STATUS_HOST;
  const apiUrl = import.meta.env.VITE_RAPIDAPI_PNR_URL;

  const isValidPnr = (pnr) => {
    return /^\d{10}$/.test(pnr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pnrNumber) {
      toast.error("Please enter a PNR number!");
      return;
    }

    if (!isValidPnr(pnrNumber)) {
      toast.error("Please enter a valid 10-digit PNR number!");
      return;
    }

    setLoading(true);
    setPnrDetails(null);

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      });

      if (response.data.success) {
        setPnrDetails(response.data.data);
        toast.success("PNR details fetched successfully!");
      } else {
        toast.error(response.data.message || "Failed to fetch PNR details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch PNR details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    pnrNumber: "🔍 No PNR Available",
    trainName: "🚆 No Train Name",
    journeyDate: "📅 No Journey Date",
    sourceStation: "❓ No Source Station",
    destinationStation: "❓ No Destination Station",
    bookingStatus: "❌ No Status",
    chartStatus: "📑 Chart Not Prepared",
  };

  return (
    <>
      <Helmet>
        <title>PNR Status Checker | OptiSEO</title>
        <meta
          name="description"
          content="Check the status of your PNR with OptiSEO's PNR Status Checker tool. Get real-time details of your train booking and journey status."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/pnr-status-checker"
        />
        <meta
          name="keywords"
          content="PNR status checker, train status, IRCTC, railway booking status, Indian Railway, PNR inquiry"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="PNR Status Checker | OptiSEO" />
        <meta
          property="og:description"
          content="Get real-time updates on your train's PNR status with OptiSEO's PNR Status Checker."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/pnr-status-checker"
        />
        <meta property="og:locale" content="en_IN" />
        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PNR Status Checker | OptiSEO" />
        <meta
          name="twitter:description"
          content="Check your train's PNR status and journey details with OptiSEO's tool."
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
            <h1 className="text-4xl font-bold">PNR Status Checker</h1>
          </header>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold">Check PNR Status</h2>
            <p className="text-gray-400 mb-4">
              Enter your 10-digit PNR number to get the status of your train
              booking.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  PNR Number
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg"
                  placeholder="Enter PNR number"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Loading..." : "Check Status"}
              </button>
            </form>

            {pnrDetails && (
              <div className="mt-8 space-y-6">
                <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400">
                    PNR Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-gray-200">
                    <div className="flex items-center">
                      <Train className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Train:</strong>{" "}
                        {pnrDetails.trainName || defaultData.trainName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Journey Date:</strong>{" "}
                        {new Date(pnrDetails.dateOfJourney).toLocaleString() ||
                          defaultData.journeyDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Source:</strong>{" "}
                        {pnrDetails.sourceStation || defaultData.sourceStation}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Destination:</strong>{" "}
                        {pnrDetails.destinationStation ||
                          defaultData.destinationStation}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Status:</strong>{" "}
                        {pnrDetails.bookingStatus || defaultData.bookingStatus}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-6 h-6 text-blue-400 mr-2" />
                      <span>
                        <strong>Chart Status:</strong>{" "}
                        {pnrDetails.chartStatus || defaultData.chartStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pnrDetails.passengerList &&
                    pnrDetails.passengerList.map((passenger, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 border border-gray-700 p-6 rounded-lg"
                      >
                        <h4 className="text-lg font-semibold text-blue-400">
                          Passenger {index + 1}
                        </h4>
                        <ul className="mt-4 space-y-2 text-gray-200">
                          <li>
                            <strong>Name:</strong> {passenger.passengerName}
                          </li>
                          <li>
                            <strong>Seat No:</strong> {passenger.seatNo}
                          </li>
                          <li>
                            <strong>Status:</strong> {passenger.passengerStatus}
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PNRStatusChecker;
