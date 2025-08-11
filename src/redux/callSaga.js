import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios"; // Assuming axios is installed and used
import {
  scheduleHealthCallRequest,
  scheduleHealthCallSuccess,
  scheduleHealthCallFailure
} from "./callSlice";

function* scheduleHealthCallSaga(action) {
  try {
    const token = localStorage.getItem("token"); // Auth token for protect middleware
    
    if (!token) {
        // Handle case where token is missing (e.g., user not logged in)
        yield put(scheduleHealthCallFailure("No authentication token found. Please log in."));
        return; // Stop saga execution
    }

    const { data } = yield call(axios.post, "http://localhost:5000/api/calls/scheduleCall", action.payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(scheduleHealthCallSuccess(data));
  } catch (error) {
    // Better error handling for token issues
    if (error.response?.status === 401 || error.response?.status === 403) {
        yield put(scheduleHealthCallFailure("Authentication failed. Please log in again."));
        // Optionally dispatch logout here if token is consistently invalid/expired
        // yield put(logout()); 
    } else {
        yield put(scheduleHealthCallFailure(error.response?.data?.message || error.message));
    }
  }
}

export function* watchScheduleHealthCall() {
  yield takeLatest(scheduleHealthCallRequest.type, scheduleHealthCallSaga);
}