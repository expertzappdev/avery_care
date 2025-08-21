import React, { useEffect } from "react"; // Added useEffect here for Layout logs
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from "./components/PublicRoute";

// Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/dashboard/Dashboard";
import FamilyMembers from "./components/pages/dashboard/FamilyMembers";
import FamilyMembersDetails from './components/pages/dashboard/FamilyMemberDetails'
import ScheduleHealthCall from "./components/pages/dashboard/ScheduleHealthCall";
import CallHistory from "./components/pages/dashboard/CallHistory";
import UpdateProfile from "./components/pages/dashboard/Settings";
import CallDetails from "./components/pages/dashboard/CallDetails";
import NotFound from "./components/pages/404";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import VerifyOtp from "./components/pages/VerifyOtp";

function Layout() {
  const location = useLocation();

  //  CORRECTED LOGIC: Use a more flexible check for the family member details route
  const showSidebar = [
    "/dashboard",
    "/family-members",
    "/schedule",
    "/history",
    "/settings",
    "/call-details"
  ].includes(location.pathname) || location.pathname.startsWith("/family/");

  //  Add mount/unmount logs to Layout
  useEffect(() => {
    console.log("Layout Component Mounted!");
    return () => {
      console.log("Layout Component Unmounted!");
    };
  }, []); // Empty dependency array ensures it runs once on mount/unmount


  return (
    <div className="flex flex-col ">
      <Navbar />

      <div className="flex max-h-fit min-h-screen flex-1 shadow-xs mb-10">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col bg-white">
          <main className="flex-1 p-6 md:p-8">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={  <Home /> } />
              <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}  />
              <Route path="/signup" element={<PublicRoute> <Register /> </PublicRoute>} />
              <Route path="/verify-otp" element={<VerifyOtp />} />

              {/* Dashboard Pages */}
              <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
              <Route path="/family-members" element={<ProtectedRoute> <FamilyMembers /> </ProtectedRoute>} />
              <Route path="/family/:id" element={<ProtectedRoute> <FamilyMembersDetails /> </ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute> <ScheduleHealthCall /> </ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute> <CallHistory /> </ProtectedRoute>} />
              <Route path="/call-details" element={<ProtectedRoute> <CallDetails /> </ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}