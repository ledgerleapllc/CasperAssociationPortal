/* eslint-disable node/callback-return */
import { put, takeLatest, all } from 'redux-saga/effects';
import qs from 'qs';
import { get, post, put as putApi } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import {
  uploadLetterSuccess,
  uploadLetterError,
  getOwnerNodesSuccess,
  getOwnerNodesError,
} from './actions';

export function* helloSignRequest({ resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const res = yield post(['users/hellosign-request'], null, { headers });
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
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

export function* verifyFileCasperSigner({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const formData = new FormData();
    formData.append('file', payload.newFile);
    yield post(['users/verify-file-casper-signer'], formData, { headers });
    resolve();
  } catch (error) {
    reject();
  }
}

export function* downloadMessageContent({ resolve, reject }) {
  try {
    const res = yield get(['users/message-content'], { responseType: 'blob' });
    resolve(res);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* submitKYC({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/submit-kyc'], payload, { headers });
    resolve();
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject();
  }
}

export function* saveShuftiproTemp({ payload }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/shuftipro-temp'], payload, { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* deleteShuftiproTemp({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield putApi(['users/shuftipro-temp/delete'], payload, { headers });
    resolve();
  } catch (error) {
    if (error.data.code === 400) {
      resolve();
    } else {
      yield put(saveApiResponseError(error));
      reject();
    }
  }
}

export function* updateShuftiproTemp({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield putApi(['users/shuftipro-temp'], payload, { headers });
    resolve();
  } catch (error) {
    if (error.data.code === 400) {
      resolve();
    } else {
      yield put(saveApiResponseError(error));
      reject();
    }
  }
}

export function* uploadLetter({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const formData = new FormData();
    formData.append('file', payload.newFile);
    const res = yield post(['users/upload-letter'], formData, { headers });
    yield put(uploadLetterSuccess(res.data));
    resolve();
  } catch (error) {
    reject();
    yield put(uploadLetterError(error));
    yield put(saveApiResponseError(error));
  }
}

export function* getOwnerNodes() {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = yield get(['users/owner-node'], { headers });
    yield put(getOwnerNodesSuccess(res.data));
  } catch (error) {
    yield put(getOwnerNodesError(error));
    yield put(saveApiResponseError(error));
  }
}

export function* resendEmailOwnerNodes({ payload }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/resend-invite-owner'], payload, { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getMembershipFileForUser({ payload, resolve, reject }) {
  try {
    const res = yield get(['users/membership-file'], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* membershipAgreementForUser({ payload, resolve, reject }) {
  try {
    const res = yield post(['users/membership-agreement'], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchOnboard() {
  yield all([takeLatest('HELLO_SIGN_REQUEST', helloSignRequest)]);
  yield all([takeLatest('SUBMIT_PUBLIC_ADDRESS', submitPublicAddress)]);
  yield all([takeLatest('VERIFY_FILE_CASPER_SIGNER', verifyFileCasperSigner)]);
  yield all([takeLatest('DOWNLOAD_MESSAGE_CONTENT', downloadMessageContent)]);
  yield all([takeLatest('SUBMIT_KYC', submitKYC)]);
  yield all([takeLatest('SAVE_SHUFTI', saveShuftiproTemp)]);
  yield all([takeLatest('UPDATE_SHUFTI', updateShuftiproTemp)]);
  yield all([takeLatest('DELETE_SHUFTI', deleteShuftiproTemp)]);
  yield all([takeLatest('UPLOAD_LETTER', uploadLetter)]);
  yield all([takeLatest('GET_OWNER_NODES', getOwnerNodes)]);
  yield all([takeLatest('RESEND_EMAIL_OWNER_NODES', resendEmailOwnerNodes)]);
  yield all([
    takeLatest('GET_MEMBERSHIP_FILE_FOR_USER', getMembershipFileForUser),
  ]);
  yield all([
    takeLatest('MEMBERSHIP_AGREEMENT_FOR_USER', membershipAgreementForUser),
  ]);
}
