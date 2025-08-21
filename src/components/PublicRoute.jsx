import React from "react";
// Navigate aur useSelector ki ab yahan zaroorat nahi hai,
// kyunki redirect ka kaam ab sirf Login.js karega.
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  // Yahan se redirect wala logic hata diya gaya hai taaki
  // Login.js ko role check karne ka mauka mil sake.
  // Isse race condition fix ho jaayegi.

  return children;
}