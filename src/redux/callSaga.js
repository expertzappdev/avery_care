import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Toast import
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

function* getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    const msg = "No authentication token found. Please log in.";
    toast.error(msg); // ❌ error toast
    yield put(scheduleHealthCallFailure(msg));
    return null;
  }
  return token;
}

function* scheduleHealthCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { data } = yield call(
      axios.post,
      `${API_BASE_URL}/scheduleCall`, // ✅ using base url
      action.payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(scheduleHealthCallSuccess(data));

    toast.success(data.message || "Call scheduled successfully ✅"); // ✅ success toast

    const currentUser = yield select((state) => state.auth.user);
    if (currentUser && currentUser._id) {
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id }));
    }
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to schedule call.";
    toast.error(msg); // ❌ error toast
    yield put(scheduleHealthCallFailure(msg));
  }
}

function* fetchScheduledCallsSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { userId } = action.payload;
    const { data } = yield call(
      axios.post,
      `${API_BASE_URL}/getAllScheduledCalls`, // ✅ using base url
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const transformedCalls = {};
    if (data.success && Array.isArray(data.data)) {
      data.data.forEach((call) => {
        transformedCalls[call._id] = call;
      });
    }

    yield put(fetchScheduledCallsSuccess(transformedCalls));
    // toast.success(data.message || "Calls fetched successfully ✅"); // ✅ toast
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg); // ❌ toast
    yield put(fetchScheduledCallsFailure(msg));
  }
}

function* updateScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { id, scheduledAt } = action.payload;
    const { data } = yield call(
      axios.post,
      `${API_BASE_URL}/update-call`, // ✅ using base url
      { id, scheduledAt },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(updateScheduledCallSuccess(data));

    toast.success(data.message || "Call updated successfully ✅"); // ✅ toast

    const currentUser = yield select((state) => state.auth.user);
    if (currentUser && currentUser._id) {
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id }));
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg); // ❌ toast
    yield put(updateScheduledCallFailure(msg));
  }
}

function* deleteScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const callId = action.payload;
    const { data } = yield call(
      axios.delete,
      `${API_BASE_URL}/delete-call/${callId}`, // ✅ using base url
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(deleteScheduledCallSuccess(data));

    toast.success(data.message || "Call deleted successfully 🗑️"); // ✅ toast

    const currentUser = yield select((state) => state.auth.user);
    if (currentUser && currentUser._id) {
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id }));
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg); //  toast
    yield put(deleteScheduledCallFailure(msg));
  }
}

export function* watchCallSagas() {
  yield takeLatest(scheduleHealthCallRequest.type, scheduleHealthCallSaga);
  yield takeLatest(fetchScheduledCallsRequest.type, fetchScheduledCallsSaga);
  yield takeLatest(updateScheduledCallRequest.type, updateScheduledCallSaga);
  yield takeLatest(deleteScheduledCallRequest.type, deleteScheduledCallSaga);
}
