import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllTools from "./pages/AllTools";
import DomainAgeChecker from "./pages/DomainAgeChecker";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<AllTools />} />
        <Route path="/domain-age-checker" element={<DomainAgeChecker />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
