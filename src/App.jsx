import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import FeatureSection from "./components/FeatureSection";

function App() {
  return (
    <div className="bg-[#f9fbfa]">
      <Navbar />
      <Hero />
      <FeatureSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
