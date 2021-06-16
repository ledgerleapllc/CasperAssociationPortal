import { put, takeLatest, all } from 'redux-saga/effects';
import qs from 'qs';
import { post } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* helloSignRequest({ callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    yield post(['users/hellosign-request'], null, { headers });
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* submitPublicAddress({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      public_address: payload.publicAddress,
    });
    yield post(['users/submit-public-address'], params, { headers });
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
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
    formData.append('file', payload.acceptedFiles[0]);
    yield post(['users/verify-file-casper-signer'], formData, { headers });
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* watchOnboard() {
  yield all([takeLatest('HELLO_SIGN_REQUEST', helloSignRequest)]);
  yield all([takeLatest('SUBMIT_PUBLIC_ADDRESS', submitPublicAddress)]);
  yield all([takeLatest('VERIFY_FILE_CASPER_SIGNER', verifyFileCasperSigner)]);
}
