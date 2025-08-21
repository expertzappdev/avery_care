import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  scheduleHealthCallRequest,
  scheduleHealthCallSuccess,
  scheduleHealthCallFailure,
  fetchScheduledCallsRequest,
  fetchScheduledCallsSuccess,
  fetchScheduledCallsFailure,
  updateScheduledCallRequest,
  updateScheduledCallSuccess,
  updateScheduledCallFailure,
  deleteScheduledCallRequest,
  deleteScheduledCallSuccess,
  deleteScheduledCallFailure,
} from "./callSlice";

// Common API base url
const API_BASE_URL = "http://localhost:5000/api/calls";

// Helper function to get auth token
function* getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    const msg = "No authentication token found. Please log in.";
    toast.error(msg);
    yield put(scheduleHealthCallFailure(msg));
    return null;
  }
  return token;
}

// Saga for scheduling a health call
function* scheduleHealthCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { data } = yield call(
      axios.post,
      `${API_BASE_URL}/scheduleCall`, // Backend endpoint for scheduling
      action.payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(scheduleHealthCallSuccess(data));

    toast.success(data.message || "Call scheduled successfully ✅");

    const { page, limit } = yield select((state) => state.call.scheduledCalls);
    yield put(fetchScheduledCallsRequest({ page, limit, status: 'pending' }));
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to schedule call.";
    toast.error(msg);
    yield put(scheduleHealthCallFailure(msg));
  }
}

// Saga for fetching scheduled calls (with pagination and filters)
function* fetchScheduledCallsSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { page, limit, status, recipientName, dateKeyword } = action.payload;

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);
    if (recipientName) queryParams.append("recipientName", recipientName);
    if (dateKeyword) queryParams.append("dateKeyword", dateKeyword);

    const { data } = yield call(
      axios.get,
      `${API_BASE_URL}/getScheduledCalls?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    yield put(fetchScheduledCallsSuccess(data));
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    yield put(fetchScheduledCallsFailure(msg));
  }
}

// Saga for updating a scheduled call
function* updateScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { id, scheduledAt } = action.payload;

    const { data } = yield call(
      axios.put,
      `${API_BASE_URL}/update-call/${id}`,
      { scheduledAt },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    yield put(updateScheduledCallSuccess(data));
    toast.success(data.message || "Call updated successfully ✅");

    const { page, limit } = yield select((state) => state.call.scheduledCalls);
    yield put(fetchScheduledCallsRequest({ page, limit, status: 'pending' }));
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    yield put(updateScheduledCallFailure(msg));
  }
}

// Saga for deleting a scheduled call
function* deleteScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const callId = action.payload;
    const { data } = yield call(
      axios.delete,
      `${API_BASE_URL}/delete-call/${callId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(deleteScheduledCallSuccess(data));

    toast.success(data.message || "Call deleted successfully 🗑️");

    // FIX: deleted call ke baad dobara completed calls fetch karein
    const { page, limit } = yield select((state) => state.call.scheduledCalls);
    yield put(fetchScheduledCallsRequest({ page, limit, status: 'completed' }));
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    yield put(deleteScheduledCallFailure(msg));
  }
}

// Watcher saga to listen for actions
export function* watchCallSagas() {
  yield takeLatest(scheduleHealthCallRequest.type, scheduleHealthCallSaga);
  yield takeLatest(fetchScheduledCallsRequest.type, fetchScheduledCallsSaga);
  yield takeLatest(updateScheduledCallRequest.type, updateScheduledCallSaga);
  yield takeLatest(deleteScheduledCallRequest.type, deleteScheduledCallSaga);
}