import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="bg-[#f9fbfa]">
      <Navbar />
      <Home/>
      <Footer />
    </div>
  );
}

export default App;
