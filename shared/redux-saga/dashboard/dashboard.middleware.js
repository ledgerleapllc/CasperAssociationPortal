import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getListCategorySupportSuccess,
  getListCategorySupportError,
} from './dashboard.actions';

export function* getListDataDemo() {
  try {
    const res = [{ a: 'a', b: 'b' }];
    yield put(getListCategorySupportSuccess(res));
  } catch (error) {
    yield put(getListCategorySupportError(error));
  }
}

export function* watchDemoData() {
  yield all([takeLatest('GET_DASHBOARD_DATA_DEMO', getListDataDemo)]);
}
