import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, clearError } from "../../redux/authSlice"; // Removed clearSuccessMessage as it's not relevant for login success
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  // Login success logic: checks for isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Welcome back!", { position: "top-right" });
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]); // Added navigate to the dependency array

  // Error logic: checks for error state
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="sm:min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-white pt-10 sm:pt-16 max-sm:pt-28 max-sm:mb-60 max-sm:px-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Login to access your account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
          <a href="#" className="text-sm font-medium text-[#3fbf81] hover:underline mt-2 inline-block">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-lg font-semibold text-white bg-[#3fbf81] 
            hover:bg-[#34a06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3fbf81] transition-all"
          disabled={loading} // Disable the button while the login request is in progress
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Signup Link */}
      <div className="mt-6 text-center text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-semibold text-[#3fbf81] hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
