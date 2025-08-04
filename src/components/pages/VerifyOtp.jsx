import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtpRequest,
  clearError,
  clearSuccessMessage,
} from "../../redux/authSlice";
import { toast } from "react-toastify";
import { XMarkIcon } from '@heroicons/react/24/solid'; // Example icon for a close button if needed

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email: initialEmail } = location.state || {};
  const { loading, error, successMessage, email: storedEmail, verified, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const emailToVerify = initialEmail || storedEmail;

  const [otp, setOtp] = useState("");

  // Redirect if already verified or authenticated
  useEffect(() => {
    if (isAuthenticated && verified) {
      toast.info("You are already verified and logged in.", { position: "top-right" });
      navigate("/dashboard"); // Redirect to dashboard or home
    }
  }, [isAuthenticated, verified, navigate]);

  // Handle success message from Redux after OTP verification
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right" });
      dispatch(clearSuccessMessage());
      if (verified && isAuthenticated) {
         navigate("/login"); // Or your main dashboard
      }
    }
  }, [successMessage, dispatch, navigate, verified, isAuthenticated]);

  // Handle error message from Redux after OTP verification
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (!emailToVerify) {
    toast.error("No email provided for verification. Please sign up again.", { position: "top-right" });
    navigate("/signup");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP.", { position: "top-right" });
      return;
    }
    dispatch(verifyOtpRequest({ email: emailToVerify, otp }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Enter the 6-digit OTP sent to: <strong className="font-semibold text-[#3fbf81]">{emailToVerify}</strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength="6"
              inputMode="numeric"
              pattern="[0-9]{6}"
              autoComplete="one-time-code"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-[#3fbf81] focus:border-[#3fbf81] placeholder-gray-400 transition"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-full text-lg font-semibold text-white bg-[#3fbf81]
                         hover:bg-[#34a06c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3fbf81] transition-all"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
