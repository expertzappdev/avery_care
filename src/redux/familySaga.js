import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchFamilyMembersRequest,
  fetchFamilyMembersSuccess,
  fetchFamilyMembersFailure,
  addFamilyMemberRequest,
  addFamilyMemberFailure,
  deleteFamilyMemberRequest,
  deleteFamilyMemberFailure,
} from "./familySlice"; // Updated import from familySlice

const selectAuthToken = (state) => state.auth.user?.token;
const API_BASE_URL = "http://localhost:5000/api/family";

function* fetchFamilyMembersSaga() {
  try {
    const token = yield select(selectAuthToken);
    const config = { headers: { "Content-Type": "application/json" } };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      yield put(
        fetchFamilyMembersFailure("User not authenticated. Please log in.")
      );
      return;
    }

    // yield put(fetchFamilyMembersRequest()); // ❌ Removed: Request action already sets loading
    const response = yield call(() =>
      axios.get(`${API_BASE_URL}/fetchFamilyMembers`, config)
    );
    yield put(fetchFamilyMembersSuccess(response.data));
  } catch (error) {
    let errorMessage = "Failed to fetch family members. Please try again.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(fetchFamilyMembersFailure(errorMessage));
  }
}

function* addFamilyMemberSaga(action) {
  try {
    const token = yield select(selectAuthToken);
    const config = { headers: { "Content-Type": "application/json" } };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      yield put(addFamilyMemberFailure("User not authenticated. Please log in."));
      return;
    }

    yield call(() => axios.post(API_BASE_URL, action.payload, config));
    yield put(fetchFamilyMembersRequest()); // Refresh after add
    // yield put(addFamilyMemberSuccess(response.data.message || 'Family member added successfully!')); // ❌ Removed success message
    // You can still dispatch addFamilyMemberSuccess() without a payload if you want to explicitly signal completion in the slice.
    // For now, I'm just leaving it as a refresh. If you want it, uncomment the line below without the message.
    // yield put(addFamilyMemberSuccess());
  } catch (error) {
    let errorMessage = "Failed to add family member. Please try again.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(addFamilyMemberFailure(errorMessage));
  }
}

function* deleteFamilyMemberSaga(action) {
  try {
    const token = yield select(selectAuthToken);
    const config = { headers: { "Content-Type": "application/json" } };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      yield put(
        deleteFamilyMemberFailure("User not authenticated. Please log in.")
      );
      return;
    }

    yield call(() => axios.delete(`${API_BASE_URL}/${action.payload}`, config));
    yield put(fetchFamilyMembersRequest()); // Refresh after delete
    // yield put(deleteFamilyMemberSuccess(response.data.message || 'Family member deleted successfully!')); // ❌ Removed success message
    // You can still dispatch deleteFamilyMemberSuccess() without a payload if you want to explicitly signal completion in the slice.
    // For now, I'm just leaving it as a refresh. If you want it, uncomment the line below without the message.
    // yield put(deleteFamilyMemberSuccess());
  } catch (error) {
    let errorMessage = "Failed to delete family member. Please try again.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(deleteFamilyMemberFailure(errorMessage));
  }
}

export default function* familySaga() {
  yield takeLatest(fetchFamilyMembersRequest.type, fetchFamilyMembersSaga);
  yield takeLatest(addFamilyMemberRequest.type, addFamilyMemberSaga);
  yield takeLatest(deleteFamilyMemberRequest.type, deleteFamilyMemberSaga);
}