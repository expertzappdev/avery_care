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
  updateFamilyMemberRequest,
  updateFamilyMemberSuccess,
  updateFamilyMemberFailure,
} from "./familySlice";
import { toast } from "react-toastify"; // ✅ Toast import

const selectAuthToken = (state) => state.auth.user?.token;
const API_BASE_URL = "http://localhost:5000/api/family";

function* fetchFamilyMembersSaga() {
  try {
    const token = yield select(selectAuthToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(() =>
      axios.get(`${API_BASE_URL}/fetchFamilyMembers`, config)
    );
    yield put(fetchFamilyMembersSuccess(response.data));
    // toast.success(response.data.message || "Family members fetched successfully");
  } catch (error) {
    const errMsg = error?.response?.data?.message || error.message || "Failed to fetch family members";
    yield put(fetchFamilyMembersFailure(errMsg));
    toast.error(errMsg);
  }
}

function* addFamilyMemberSaga(action) {
  try {
    const token = yield select(selectAuthToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(() => axios.post(API_BASE_URL, action.payload, config));
    yield put(fetchFamilyMembersRequest());
    toast.success(response.data.message || "Family member added successfully");
  } catch (error) {
    const errMsg = error?.response?.data?.message || error.message || "Failed to add family member";
    yield put(addFamilyMemberFailure(errMsg));
    toast.error(errMsg);
  }
}

function* deleteFamilyMemberSaga(action) {
  try {
    const token = yield select(selectAuthToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(() =>
      axios.delete(`${API_BASE_URL}/${action.payload}`, config)
    );
    yield put(fetchFamilyMembersRequest());
    toast.success(response.data.message || "Family member deleted successfully");
  } catch (error) {
    const errMsg = error?.response?.data?.message || error.message || "Failed to delete family member";
    yield put(deleteFamilyMemberFailure(errMsg));
    toast.error(errMsg);
  }
}

function* updateFamilyMemberSaga(action) {
  try {
    const token = yield select(selectAuthToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { id, updatedData } = action.payload;
    const response = yield call(() =>
      axios.put(`${API_BASE_URL}/${id}`, updatedData, config)
    );
    yield put(updateFamilyMemberSuccess(response.data));
    toast.success(response.data.message || "Family member updated successfully");
  } catch (error) {
    const errMsg = error?.response?.data?.message || error.message || "Failed to update family member";
    yield put(updateFamilyMemberFailure(errMsg));
    toast.error(errMsg);
  }
}

export default function* familySaga() {
  yield takeLatest(fetchFamilyMembersRequest.type, fetchFamilyMembersSaga);
  yield takeLatest(addFamilyMemberRequest.type, addFamilyMemberSaga);
  yield takeLatest(deleteFamilyMemberRequest.type, deleteFamilyMemberSaga);
  yield takeLatest(updateFamilyMemberRequest.type, updateFamilyMemberSaga);
}
