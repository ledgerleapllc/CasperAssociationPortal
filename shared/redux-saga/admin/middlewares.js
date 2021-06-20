import { put, takeLatest, all } from 'redux-saga/effects';
import { get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import { getListMembersSuccess, getUserDetailSuccess } from './actions';

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

export function* watchAdmin() {
  yield all([takeLatest('GET_LIST_MEMBER', getListMembers)]);
  yield all([takeLatest('GET_USER_DETAIL', getUserDetail)]);
}
