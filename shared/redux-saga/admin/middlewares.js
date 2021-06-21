import { put, takeLatest, all } from 'redux-saga/effects';
import { get, post } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import {
  getListMembersSuccess,
  getUserDetailSuccess,
  getUserKYCInfoSuccess,
} from './actions';

export function* getListMembers(data) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/users?limit=${data.payload.limit}`], {
      headers,
    });
    yield put(getListMembersSuccess(res.data));
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getUserDetail(data) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/users/${data.payload}`], {
      headers,
    });
    yield put(getUserDetailSuccess(res.data));
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getUserKYCInfo(data) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/users/${data.payload}/kyc`], {
      headers,
    });
    yield put(getUserKYCInfoSuccess(res.data));
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* approveKYC(data) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post([`admin/users/${data.payload}/approve-kyc`], null, { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* denyKYC(data) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post([`admin/users/${data.payload}/deny-kyc`], null, { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* watchAdmin() {
  yield all([takeLatest('GET_LIST_MEMBER', getListMembers)]);
  yield all([takeLatest('GET_USER_DETAIL', getUserDetail)]);
  yield all([takeLatest('GET_USER_KYC_INFO', getUserKYCInfo)]);
  yield all([takeLatest('APPROVE_KYC', approveKYC)]);
  yield all([takeLatest('DENY_KYC', denyKYC)]);
}
