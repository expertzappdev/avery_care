import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
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

function* getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(scheduleHealthCallFailure("No authentication token found. Please log in."));
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
      "http://localhost:5000/api/calls/scheduleCall",
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(scheduleHealthCallSuccess(data));

    const currentUser = yield select(state => state.auth.user);
    if (currentUser && currentUser._id) {
      // Re-fetch using POST request to getAllScheduledCalls with userId in body
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id }));
    }
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      yield put(scheduleHealthCallFailure("Authentication failed. Please log in again."));
    } else {
      yield put(scheduleHealthCallFailure(error.response?.data?.message || error.message));
    }
  }
}

function* fetchScheduledCallsSaga(action) { // Action will now contain { userId }
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    // IMPORTANT: Using axios.post and sending userId in the request body
    const { userId } = action.payload; // Extract userId from action payload

    const { data } = yield call(
      axios.post, // Changed to POST
      "http://localhost:5000/api/calls/getAllScheduledCalls", // Endpoint remains the same
      { userId }, // Sending userId in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transformedCalls = {};
    if (data.success && Array.isArray(data.data)) {
      data.data.forEach(call => {
        transformedCalls[call._id] = call;
      });
    }

    yield put(fetchScheduledCallsSuccess(transformedCalls));
  } catch (error) {
    yield put(fetchScheduledCallsFailure(error.response?.data?.message || error.message));
  }
}

function* updateScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const { id, scheduledAt } = action.payload;
    const { data } = yield call(
      axios.post,
      "http://localhost:5000/api/calls/update-call",
      { id, scheduledAt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(updateScheduledCallSuccess(data));

    const currentUser = yield select(state => state.auth.user);
    if (currentUser && currentUser._id) {
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id })); // Re-fetch using POST
    }
  } catch (error) {
    yield put(updateScheduledCallFailure(error.response?.data?.message || error.message));
  }
}

function* deleteScheduledCallSaga(action) {
  try {
    const token = yield call(getAuthToken);
    if (!token) return;

    const callId = action.payload;
    const { data } = yield call(
      axios.delete,
      `http://localhost:5000/api/calls/delete-call/${callId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(deleteScheduledCallSuccess(data));

    const currentUser = yield select(state => state.auth.user);
    if (currentUser && currentUser._id) {
      yield put(fetchScheduledCallsRequest({ userId: currentUser._id })); // Re-fetch using POST
    }
  } catch (error) {
    yield put(deleteScheduledCallFailure(error.response?.data?.message || error.message));
  }
}

export function* watchCallSagas() {
  yield takeLatest(scheduleHealthCallRequest.type, scheduleHealthCallSaga);
  yield takeLatest(fetchScheduledCallsRequest.type, fetchScheduledCallsSaga);
  yield takeLatest(updateScheduledCallRequest.type, updateScheduledCallSaga);
  yield takeLatest(deleteScheduledCallRequest.type, deleteScheduledCallSaga);
}