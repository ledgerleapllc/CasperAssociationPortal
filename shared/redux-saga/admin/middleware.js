import { put, takeLatest, all } from 'redux-saga/effects';
import { get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import { getListMembersSuccess } from './action';

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

export function* watchAdmin() {
  yield all([takeLatest('GET_LIST_MEMBER', getListMembers)]);
}
