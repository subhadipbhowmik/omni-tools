import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllTools from "./pages/AllTools";
import DomainAgeChecker from "./pages/DomainAgeChecker";
import { Toaster } from "react-hot-toast";
import DNSRecordChecker from "./pages/DNSRecordChecker";
import LinkAnalyzer from "./pages/LinkAnalyzer";
import PageSizeChecker from "./pages/PageSizeChecker";
import OpenGraphChecker from "./pages/OpenGraphChecker";
import KeywordSuggestion from "./pages/KeywordSuggestion";
import KeywordRankChecker from "./pages/KeywordRankChecker";
import KeyWordDensityChecker from "./pages/KeyWordDensityChecker";
import AdsenseCalculator from "./pages/AdsenseCalculator";
import DaPaChecker from "./pages/DaPaChecker";
import PlagarismChecker from "./pages/writing/PlagarismChecker";
import About from "./pages/site/About";
import Contact from "./pages/site/Contact";
import OnlineTextEditor from "./pages/writing/OnlineTextEditor";
import GrammarChecker from "./pages/writing/GrammarChecker";
import Loader from "./components/UI/Loader";
import LetterWriting from "./pages/writing/LetterWriting";
import PNRStatusChecker from "./pages/train/PNRStatusChecker";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Trigger loader on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // Set the loader timeout duration (adjust as needed)

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [location]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      {loading && <Loader />} {/* Show the loader while loading */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<AllTools />} />
        <Route path="/domain-age-checker" element={<DomainAgeChecker />} />
        <Route path="/dns-record-checker" element={<DNSRecordChecker />} />
        <Route path="/link-analyzer" element={<LinkAnalyzer />} />
        <Route path="/page-size-checker" element={<PageSizeChecker />} />
        <Route path="/open-graph-checker" element={<OpenGraphChecker />} />
        <Route
          path="/keyword-suggestion-tool"
          element={<KeywordSuggestion />}
        />
        <Route path="/keyword-ckecker" element={<KeywordRankChecker />} />
        <Route path="/keyword-rank-checker" element={<KeywordRankChecker />} />
        <Route
          path="/keyword-density-checker"
          element={<KeyWordDensityChecker />}
        />
        <Route path="/adsense-calculator" element={<AdsenseCalculator />} />
        <Route path="/da-pa-checker" element={<DaPaChecker />} />

        {/* writing tools  */}
        <Route path="/plagarism-checker" element={<PlagarismChecker />} />
        <Route path="/online-text-editor" element={<OnlineTextEditor />} />
        <Route path="/grammar-checker" element={<GrammarChecker />} />
        <Route path="/letter-writing-generator" element={<LetterWriting />} />
        <Route path="/report-writing-generator" element={<LetterWriting />} />

        {/* trains tools  */}
        <Route path="/pnr-status-checker" element={<PNRStatusChecker />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
