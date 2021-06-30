import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getListCategorySupportSuccess,
  getListCategorySupportError,
  getVotesSuccess,
  getVotesError,
  getVoteDetailSuccess,
  getVoteDetailError,
  recordVoteSuccess,
  recordVoteError,
} from './dashboard-actions';
import { get, post } from '../../core/saga-api';

export function* getListDataDemo() {
  try {
    const res = [{ a: 'a', b: 'b' }];
    yield put(getListCategorySupportSuccess(res));
  } catch (error) {
    yield put(getListCategorySupportError(error));
  }
}

export function* getVotes({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get(
      [
        `users/votes?status=${payload.status}&limit=${payload.limit}&page=${payload.page}`,
      ],
      {
        headers,
      }
    );
    yield put(getVotesSuccess(res.data));
    callback(res.data);
  } catch (error) {
    yield put(getVotesError(error));
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
  yield all([takeLatest('GET_VOTES', getVotes)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('RECORD_VOTE', recordVote)]);
}
