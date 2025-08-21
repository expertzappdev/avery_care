import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLoginRequest,
  clearError,
} from "../../../redux/adminSlice";
import { setAdminToken } from "../../../utils/adminAuth";

const Admin = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.adminAuth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(adminLoginRequest({ email, password }));
  };

  
   useEffect(() => {
    if (isAuthenticated) {
      setAdminToken(localStorage.getItem("adminToken"));
      window.location.href = "/admin-dashboard";
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        {/* Step 1: Login */}
      
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>
          </form>
      </div>
    </div>
  );
};

export default Admin;
