import { put, takeLatest, all, delay } from 'redux-saga/effects';
import qs from 'qs';
import { get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* getPublicMembers({ payload, resolve }) {
  try {
    const query = qs.stringify({
      page: payload.page,
      limit: payload.limit || 15,
    });
    const res = yield get([`members?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getPublicMemberDetail({ id, resolve, reject }) {
  try {
    const res = yield get([`members/${id}`]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* watchMembers() {
  yield all([takeLatest('GET_PUBLIC_MEMBERS', getPublicMembers)]);
  yield all([takeLatest('GET_PUBLIC_MEMBER_DETAIL', getPublicMemberDetail)]);
}
