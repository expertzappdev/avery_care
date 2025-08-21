// src/components/AdminProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "admin") {
    // Agar login nahi ya admin nahi hai to login page ya unauthorized page par bhejo
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}



