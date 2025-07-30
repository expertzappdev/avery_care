// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ✅ Agar login nahi hai → login page par redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
