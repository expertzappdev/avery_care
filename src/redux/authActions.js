// redux/authActions.js

export const SEND_OTP_REQUEST = "SEND_OTP_REQUEST";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILURE = "SEND_OTP_FAILURE";

export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";

export const sendOtpRequest = (email) => ({
  type: SEND_OTP_REQUEST,
  payload: email,
});

export const verifyOtpRequest = (otpData) => ({
  type: VERIFY_OTP_REQUEST,
  payload: otpData, // { email, otp }
});