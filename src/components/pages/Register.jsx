import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup form submitted!");
  };

  return (
    <div className="sm:min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 bg-white pt-6 max-sm:mb-40 max-sm:px-8">
      
      {/* ✅ Title Section */}
      <div className="text-center mb-8 max-sm:mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Sign up and start your journey
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

        {/* ✅ Email */}
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 max-sm:ml-4">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
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
        </div>

        {/* ✅ Confirm Password */}
        <div className="w-full">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1 max-sm:ml-4">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition "
          />
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-lg font-semibold text-white bg-[#3fbf81] 
            hover:bg-[#34a06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3fbf81] transition-all"
        >
          Sign Up
        </button>
      </form>

      {/* ✅ Login Link */}
      <div className="mt-6 text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#3fbf81] hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
