import { put, takeLatest, all } from 'redux-saga/effects';
import qs from 'qs';
import { get, post } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* helloSignRequest({ callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const res = yield post(['users/hellosign-request'], null, { headers });
    callback(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* submitPublicAddress({ payload, callback, isVerifying }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      public_address: payload.pubAddress,
    });
    yield post(['users/submit-public-address'], params, { headers });
    callback();
    isVerifying();
  } catch (error) {
    yield put(saveApiResponseError(error));
    isVerifying();
  }
}

export function* verifyFileCasperSigner({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const formData = new FormData();
    formData.append('file', payload.newFile);
    yield post(['users/verify-file-casper-signer'], formData, { headers });
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* handleViewGuide() {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    yield get(['users/message-content'], { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

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
  yield all([takeLatest('HELLO_SIGN_REQUEST', helloSignRequest)]);
  yield all([takeLatest('SUBMIT_PUBLIC_ADDRESS', submitPublicAddress)]);
  yield all([takeLatest('VERIFY_FILE_CASPER_SIGNER', verifyFileCasperSigner)]);
  yield all([takeLatest('HANDLE_VIEW_GUIDE', handleViewGuide)]);
  yield all([takeLatest('SUBMIT_KYC', submitKYC)]);
}
