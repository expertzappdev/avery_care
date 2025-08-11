// src/redux/sagas/index.js

import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import familySaga from './familySaga'; //  ADD THIS
import { watchScheduleHealthCall } from './callSaga'; //  ADD THIS

export default function* rootSaga() {
  yield all([
    authSaga(),
    familySaga(), //  ADD THIS
    watchScheduleHealthCall(),
  ]);
}
