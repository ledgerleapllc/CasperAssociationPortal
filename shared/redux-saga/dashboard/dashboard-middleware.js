import { put, takeLatest, takeEvery, all, delay } from 'redux-saga/effects';
import qs from 'qs';
import {
  getListCategorySupportSuccess,
  getListCategorySupportError,
  getVoteDetailSuccess,
  getVoteDetailError,
  recordVoteSuccess,
  recordVoteError,
} from './dashboard-actions';
import { get, post } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';

export function* getListDataDemo() {
  try {
    const res = [{ a: 'a', b: 'b' }];
    yield put(getListCategorySupportSuccess(res));
  } catch (error) {
    yield put(getListCategorySupportError(error));
  }
}

export function* getVotes({ payload, successCb }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify({
      status: payload,
    });
    const res = yield get([`users/votes?${query}`], {
      headers,
    });
    yield delay(500); // => this need for scroll loadmore.
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getVoteDetail({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`users/votes/${payload}`], {
      headers,
    });
    yield put(getVoteDetailSuccess(res.data));
    callback(res.data);
  } catch (error) {
    yield put(getVoteDetailError(error));
  }
}

export function* recordVote({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield post(
      [`users/votes/${payload.id}`],
      { vote: payload.vote },
      {
        headers,
      }
    );
    yield put(recordVoteSuccess(res));
    callback();
  } catch (error) {
    yield put(recordVoteError(error));
  }
}

export function* watchDemoData() {
  yield all([takeLatest('GET_DASHBOARD_DATA_DEMO', getListDataDemo)]);
  yield all([takeEvery('GET_VOTES', getVotes)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('RECORD_VOTE', recordVote)]);
}
