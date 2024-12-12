import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<AllTools />} />
        <Route path="/domain-age-checker" element={<DomainAgeChecker />} />
        <Route path="/dns-record-checker" element={<DNSRecordChecker />} />
        <Route path="/link-analyzer" element={<LinkAnalyzer />} />
        <Route path="/page-size-checker" element={<PageSizeChecker />} />
        <Route path="/open-graph-checker" element={<OpenGraphChecker />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
