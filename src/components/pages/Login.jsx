import React from "react";
import { Link } from "react-router-dom";   // ✅ Yeh import add kar

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login form submitted!");
  };

  return (
    <div className="sm:min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-white pt-10 sm:pt-16 max-sm:pt-28 max-sm:mb-60 max-sm:px-8">
      
      {/* ✅ Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Login to access your account
        </p>
      </div>

      {/* ✅ Auth Form */}
      <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
        
        {/* ✅ Username */}
        <div className="w-full">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 max-sm:ml-4">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
        </div>

        {/* ✅ Password */}
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 max-sm:ml-4">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
          <a href="#" className="text-sm font-medium text-[#3fbf81] hover:underline mt-2 inline-block">
            Forgot Password?
          </a>
        </div>

        {/* ✅ Remember Me */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Remember Me</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border 
              after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3fbf81]">
            </div>
          </label>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-lg font-semibold text-white bg-[#3fbf81] 
            hover:bg-[#34a06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3fbf81] transition-all"
        >
          Login
        </button>
      </form>

      {/* ✅ Signup Link */}
      <div className="mt-6 text-center text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-semibold text-[#3fbf81] hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
