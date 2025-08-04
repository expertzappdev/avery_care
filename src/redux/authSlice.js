// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Safe localStorage user parse
let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  userFromStorage = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error("Failed to parse user from localStorage:", err);
  userFromStorage = null;
}

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
  successMessage: null,
  email: null,
  verified: !!userFromStorage, // if user exists, assume verified
  isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      // Corrected: Accessing action.payload.user to get the nested user object
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Corrected: Storing the user object, not the full payload
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = "Signup successful! Please verify OTP.";
      state.email = action.payload.email;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    verifyOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      // Corrected: Accessing action.payload.user to get the nested user object
      state.user = action.payload.user;
      state.verified = true;
      state.isAuthenticated = true;
      // Corrected: Storing the user object, not the full payload
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    verifyOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = null;
      state.verified = false;
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  logout,
  clearError,
  clearSuccessMessage,
} = authSlice.actions;

export default authSlice.reducer;
