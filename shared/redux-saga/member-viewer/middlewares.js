import { put, takeLatest, all, delay, debounce } from 'redux-saga/effects';
import qs from 'qs';
import { get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* getPublicMembers({ payload, resolve }) {
  try {
    const query = qs.stringify({ ...payload, limit: 100 });
    const res = yield get([`members?${query}`]);
    yield delay(500);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getPublicMemberDetail({
  id,
  public_address_node,
  resolve,
  reject,
}) {
  try {
    const url = public_address_node
      ? `members/${id}?public_address_node=${public_address_node}`
      : `members/${id}`;
    const res = yield get([url]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* watchMembers() {
  yield all([debounce(1000, 'GET_PUBLIC_MEMBERS', getPublicMembers)]);
  yield all([takeLatest('GET_PUBLIC_MEMBER_DETAIL', getPublicMemberDetail)]);
}
