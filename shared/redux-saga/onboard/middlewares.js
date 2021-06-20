import { put, takeLatest, all } from 'redux-saga/effects';
import { post } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* submitKYC({ payload, resolve }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/submit-kyc'], payload, { headers });
    resolve();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* watchOnboard() {
  yield all([takeLatest('SUBMIT_KYC', submitKYC)]);
}
