// redux/familySaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_FAMILY_MEMBERS_REQUEST,
  ADD_FAMILY_MEMBER_REQUEST,
  DELETE_FAMILY_MEMBER_REQUEST,
} from './familyActions';
import { setFamilyLoading, setFamilyMembers, setFamilyError } from './familySlice';

function* fetchFamilyMembersSaga() {
  try {
    yield put(setFamilyLoading(true));
    const response = yield call(() => axios.get('http://localhost:5000/api/family/fetchFamilyMembers'));
    yield put(setFamilyMembers(response.data));
    yield put(setFamilyLoading(false));
  } catch (error) {
    yield put(setFamilyError(error.message));
    yield put(setFamilyLoading(false));
  }
}

function* addFamilyMemberSaga(action) {
  try {
    yield put(setFamilyLoading(true));
    yield call(() => axios.post('http://localhost:5000/api/family', action.payload));
    yield put({ type: FETCH_FAMILY_MEMBERS_REQUEST }); // Refresh after add
  } catch (error) {
    yield put(setFamilyError(error.message));
  } finally {
    yield put(setFamilyLoading(false));
  }
}

function* deleteFamilyMemberSaga(action) {
  try {
    yield put(setFamilyLoading(true));
    yield call(() => axios.delete(`http://localhost:5000/api/family/${action.payload}`));
    yield put({ type: FETCH_FAMILY_MEMBERS_REQUEST }); // Refresh after delete
  } catch (error) {
    yield put(setFamilyError(error.message));
  } finally {
    yield put(setFamilyLoading(false));
  }
}

export default function* familySaga() {
  yield takeLatest(FETCH_FAMILY_MEMBERS_REQUEST, fetchFamilyMembersSaga);
  yield takeLatest(ADD_FAMILY_MEMBER_REQUEST, addFamilyMemberSaga);
  yield takeLatest(DELETE_FAMILY_MEMBER_REQUEST, deleteFamilyMemberSaga);
}
