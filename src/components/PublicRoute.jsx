import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Agar user logged in hai to dashboard bhej do
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
