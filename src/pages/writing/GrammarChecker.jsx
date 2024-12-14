import React, { useState } from "react";
import { aiChat } from "../../Utils/AiModel.js";
import { toast } from "react-hot-toast";
import { ClipboardPaste } from "lucide-react";
import { Helmet } from "react-helmet-async";

function GrammarChecker() {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function pasteText() {
    navigator.clipboard.readText().then((text) => {
      setInputText(text);
      toast.success("Text pasted successfully!");
    });
  }

  function copyText() {
    navigator.clipboard.writeText(correctedText).then(() => {
      toast.success("Text copied to clipboard!");
    });
  }

  const handleCorrection = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await aiChat.sendMessage(
        `Correct the following text grammatically: "${inputText}"`
      );

      const response = await result.response;
      const correctedText = await response.text();

      setCorrectedText(correctedText);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setCorrectedText("An error occurred while correcting the text.");
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Grammar Checker | OptiSEO</title>
        <meta
          name="description"
          content="Improve your content's grammar with OptiSEO's Grammar Checker. Ensure your text is error-free and optimized for better readability and SEO performance."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/grammar-checker"
        />
        <meta
          name="keywords"
          content="grammar checker, SEO tools, writing improvement, grammar correction, content optimization"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shubhadip Bhowmik" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Grammar Checker | OptiSEO" />
        <meta
          property="og:description"
          content="Enhance your content's grammar and readability with OptiSEO's Grammar Checker. Improve your writing for better SEO results."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/grammar-checker"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grammar Checker | OptiSEO" />
        <meta
          name="twitter:description"
          content="Check and improve your content's grammar with OptiSEO's Grammar Checker for better readability and SEO performance."
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
        <div className="mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-600">
              Grammar Checker
            </h1>
          </header>

          <div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side: Input Text */}
              <div className="flex-1 bg-gray-700 p-6 rounded-lg">
                <div className="flex gap-2 items-center">
                  <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                    Enter Text
                  </h2>
                  <button className="flex items-center" onClick={pasteText}>
                    <ClipboardPaste className="w-6 h-6 mb-2" />
                    Paste
                  </button>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your text here..."
                  className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={8}
                ></textarea>
                <button
                  onClick={handleCorrection}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Correct Text"}
                </button>
              </div>

              {/* Right side: Corrected Text */}
              <div className="flex-1 bg-gray-700 p-6 rounded-lg flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                    Corrected Text
                  </h2>
                  <button className="flex items-center" onClick={copyText}>
                    <ClipboardPaste className="w-6 h-6 mb-2" />
                  </button>
                </div>
                <div
                  className={`p-4 bg-white text-black rounded-lg shadow-md flex-1 max-h-[calc(100vh-150px)] overflow-y-auto ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  {isLoading ? (
                    <p className="text-gray-500">Correcting text...</p>
                  ) : correctedText ? (
                    <p>{correctedText}</p>
                  ) : (
                    <p className="text-gray-500">
                      Your corrected text will appear here.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GrammarChecker;
