import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
} from './authSlice';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api/auth';

//  Signup worker
function* signupWorker(action) {
  try {
    const response = yield call(() =>
      fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      }).then(res => res.json())
    );

    if (response.success) {
      yield put(signupSuccess({ email: action.payload.email }));
      toast.success(response.message || "Signup successful! Please verify OTP");
    } else {
      yield put(signupFailure(response.message || 'Signup failed. Please try again.'));
      toast.error(response.message || 'Signup failed');
    }
  } catch (error) {
    yield put(signupFailure(error.message || 'Network error during signup.'));
    toast.error(error.message || 'Network error during signup');
  }
}

// ✅ Login worker
function* loginWorker(action) {
  try {
    const response = yield call(() =>
      fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      }).then(res => res.json())
    );
    // console.log('Login API response:', response); // <-- Add this line
    if (response.success) {
      yield put(loginSuccess({ user: response }));
      toast.success(response.message || "Login successful. Welcome back!");
    } else {
      yield put(loginFailure(response.message || 'Login failed. Invalid credentials.'));
      toast.error(response.message || 'Login failed');
    }
  } catch (error) {
    yield put(loginFailure(error.message || 'Network error during login.'));
    toast.error(error.message || 'Network error during login');
  }
}

// ✅ OTP Verify worker
function* verifyOtpWorker(action) {
  try {
    const response = yield call(() =>
      fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      }).then(res => res.json())
    );
    if (response.success) {
      yield put(verifyOtpSuccess({ user: response }));
      toast.success(response.message || "OTP verified successfully");
    } else {
      yield put(verifyOtpFailure(response.message || 'OTP verification failed.'));
      toast.error(response.message || 'OTP verification failed ❌');
    }
  } catch (error) {
    yield put(verifyOtpFailure(error.message || 'Network error during OTP verification.'));
    toast.error(error.message || 'OTP verification failed ❌');
  }
}

export default function* authSaga() {
  yield takeLatest(signupRequest.type, signupWorker);
  yield takeLatest(loginRequest.type, loginWorker);
  yield takeLatest(verifyOtpRequest.type, verifyOtpWorker);
}
