import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import DashboardLayout from "./components/pages/DashboardLayout"; // ✅ Sidebar + Dashboard
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-input-2/lib/style.css';


function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* ✅ Protected Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute>}/>

      </Routes>

      <Footer />
      <ToastContainer/>
    </Router>
  );
}

export default App;
