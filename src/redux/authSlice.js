import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,   
    successMessage: null,     
  },
  reducers: {
    // ✅ LOGIN reducers
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;   
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // ✅ SIGNUP reducers
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.successMessage = "✅ Account created successfully! Please login.";
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // ✅ Success Message clear karne ke liye
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // ✅ Error clear karne ke liye (Toast ke baad hata denge)
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest, loginSuccess, loginFailure,
  signupRequest, signupSuccess, signupFailure,
  logout, clearSuccessMessage, clearError
} = authSlice.actions;

export default authSlice.reducer;
