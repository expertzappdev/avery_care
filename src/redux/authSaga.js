// redux/authSaga.js
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

// ✅ API base URL - make sure this is correct for your backend
const API_BASE_URL = 'http://localhost:5000/api/auth';

// ✅ Signup worker
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
    } else {
      yield put(signupFailure(response.message || 'Signup failed. Please try again.'));
    }
  } catch (error) {
    yield put(signupFailure(error.message || 'Network error during signup.'));
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
    if (response.success) {
      // Corrected: Pass the entire response object as the 'user' payload.
      yield put(loginSuccess({ user: response }));
    } else {
      yield put(loginFailure(response.message || 'Login failed. Invalid credentials.'));
    }
  } catch (error) {
    yield put(loginFailure(error.message || 'Network error during login.'));
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
      // Corrected: Pass the entire response object as the 'user' payload.
      yield put(verifyOtpSuccess({ user: response }));
    } else {
      yield put(verifyOtpFailure(response.message || 'OTP verification failed.'));
    }
  } catch (error) {
    yield put(verifyOtpFailure(error.message || 'Network error during OTP verification.'));
  }
}

export default function* authSaga() {
  yield takeLatest(signupRequest.type, signupWorker);
  yield takeLatest(loginRequest.type, loginWorker);
  yield takeLatest(verifyOtpRequest.type, verifyOtpWorker);
}
