import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest, clearSuccessMessage, clearError } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'; // ✅ Import CSS

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // ✅ Handle change for normal inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Phone input handle
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: `+${value}` }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupRequest(formData));
  };

  // ✅ Success toast + redirect
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right" });
      dispatch(clearSuccessMessage());
      navigate("/login");
    }
  }, [successMessage, dispatch, navigate]);

  // ✅ Error toast
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

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

      {/* ✅ Signup Form */}
      <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>

        {/* ✅ Name */}
        <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
        </div>

        {/* ✅ Email */}
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
        </div>

        {/* ✅ Phone (with country code dropdown) */}
        <div className="w-full">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <PhoneInput
            country={"in"} // default India
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            inputStyle={{
              width: "100%",
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              paddingLeft: "60px"
            }}
            buttonStyle={{
              borderRadius: "8px 0 0 8px",
              border: "1px solid #d1d5db",
              padding:"0 5px 0",
            }}
          />
        </div>

        {/* ✅ Password */}
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
          />
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-lg font-semibold text-white bg-[#3fbf81] 
            hover:bg-[#34a06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3fbf81] transition-all"
        >
          {loading ? "Signing Up..." : "Sign Up"}
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
