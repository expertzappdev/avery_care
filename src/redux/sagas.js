import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest, loginSuccess, loginFailure,
  signupRequest, signupSuccess, signupFailure
} from "./authSlice";

const API_URL = "http://192.168.10.156:5000/api/auth";

// ✅ API Calls
function loginApi(payload) {
  return axios.post(`${API_URL}/login`, payload);
}
function signupApi(payload) {
  return axios.post(`${API_URL}/register`, payload);
}

// ✅ LOGIN Saga
function* handleLogin(action) {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

// ✅ SIGNUP Saga
function* handleSignup(action) {
  try {
    const response = yield call(signupApi, action.payload);
    yield put(signupSuccess(response.data));
  } catch (error) {
    yield put(signupFailure(error.response?.data?.message || "Signup failed"));
  }
}

// ✅ Watcher Saga
function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}

// ✅ Root Saga
export default function* rootSaga() {
  yield all([watchAuth()]);
}
