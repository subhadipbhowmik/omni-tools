import React, { useState } from "react";
import { aiChat } from "../../Utils/AiModel.js";
import { toast } from "react-hot-toast";
import { ClipboardPaste, Info } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";

function LetterWriting() {
  const [toField, setToField] = useState("");
  const [forField, setForField] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("formal"); // Default tone
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLetter = async () => {
    if (!toField.trim() || !forField.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `
        Write a ${tone} letter to ${toField} for ${forField}.
        The letter should be structured as follows with appropriate line breaksa nd space:
      
        1. **Greeting**: A formal or informal greeting based on the tone. 
           (Example: "Dear [Recipient's Name],")
      
        2. **Introduction**: A brief introduction explaining the purpose of the letter. 
           (Example: "I am writing to [state the purpose of the letter].")
      
        3. **Body**: A detailed explanation of the purpose, including all relevant information, context, or description provided.
           - Ensure the body is divided into clear paragraphs. Each paragraph should focus on one specific point or detail.
           - Use line breaks to separate different ideas or sections within the body.
      
        4. **Closing**: A polite closing statement, suitable for the tone of the letter.
           (Example: "I look forward to your response. Thank you for your time and consideration.")
      
        Ensure the letter is clear, professional (if formal) or casual (if informal), and has proper paragraph breaks where needed for readability.
      
        Here is a brief description: ${description}
      `;

      const result = await aiChat.sendMessage(prompt);

      const response = await result.response;
      const letter = await response.text();

      setGeneratedLetter(letter); // Set the letter as is (in markdown format)
    } catch (error) {
      console.error("Error generating letter:", error);
      setGeneratedLetter("An error occurred while generating the letter.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter).then(() => {
      toast.success("Letter copied to clipboard!");
    });
  };

  return (
    <>
      <Helmet>
        <title>Letter Writing | OptiSEO</title>
        <meta
          name="description"
          content="Generate personalized letters with ease using OptiSEO's Letter Writing tool."
        />
        <meta name="author" content="Shubhadip Bhowmik" />
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-600">
              Letter Writing
            </h1>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side: Input Fields */}
            <div className="flex-1 bg-gray-700 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">To</label>
                <input
                  type="text"
                  value={toField}
                  onChange={(e) => setToField(e.target.value)}
                  placeholder="Recipient"
                  className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">For</label>
                <input
                  type="text"
                  value={forField}
                  onChange={(e) => setForField(e.target.value)}
                  placeholder="Purpose"
                  className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Short Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description"
                  className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Tone Type
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="formal">Formal</option>
                  <option value="informal">Informal</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="apologetic">Apologetic</option>
                </select>
              </div>

              <button
                onClick={handleGenerateLetter}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Letter"}
              </button>
            </div>

            {/* Right Side: Generated Letter */}
            <div className="flex-1 bg-gray-700 p-6 rounded-lg flex-col">
              <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                Generated Letter
              </h2>
              <div
                className={`p-4 bg-white text-black rounded-lg shadow-md flex-1 max-h-[calc(100vh-150px)] overflow-y-auto ${
                  isLoading ? "animate-pulse" : ""
                }`}
              >
                {isLoading ? (
                  <p className="text-gray-500">Generating letter...</p>
                ) : generatedLetter ? (
                  <ReactMarkdown>{generatedLetter}</ReactMarkdown>
                ) : (
                  <p className="text-gray-500">
                    Your generated letter will appear here.
                  </p>
                )}
              </div>
              <button
                onClick={handleCopyLetter}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                disabled={!generatedLetter}
              >
                Copy Letter
              </button>

              {/* Instruction Note */}
              <div className="mt-6 p-6 bg-indigo-500 text-white rounded-lg shadow-xl">
                <div className="flex items-center gap-4">
                  <Info className="text-white w-12 h-12" />
                  <p className="text-sm font-medium">
                    Please do not just copy and paste the letter. Modify the
                    details according to your responsibility and the specific
                    context of your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LetterWriting;
