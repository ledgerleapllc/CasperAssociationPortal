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
import { get, post, put as _put, destroy } from '../../core/saga-api';
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
    const query = qs.stringify(payload);
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

export function* getDiscussions({ payload, successCb }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`discussions/all?${query}`]);
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getPinnedDiscussions({ successCb }) {
  try {
    const res = yield get([`discussions/pin`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getMyDiscussions({ successCb }) {
  try {
    const res = yield get([`discussions/my`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getTrendingDiscussions({ successCb }) {
  try {
    const res = yield get(['discussions/trending']);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* setDiscussionPin({ id, successCb }) {
  try {
    const res = yield post([`discussions/${id}/pin`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* createDiscussion({ payload, successCb, resetSubmitting }) {
  try {
    const res = yield post([`discussions/new`], payload);
    successCb(res.data);
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* setRemoveNewMark({ id, successCb }) {
  try {
    const res = yield destroy([`discussions/${id}/new`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getDiscussionDetail({ id, successCb }) {
  try {
    const res = yield get([`discussions/detail/${id}`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* postDiscussionComment({ payload, successCb }) {
  try {
    let res;
    const endpoint = `discussions/${payload.discussion_id}/comment`;
    if (payload.comment_id === -1)
      res = yield post([endpoint], {
        description: payload.description,
      });
    else
      res = yield _put([endpoint], {
        comment_id: payload.comment_id,
        description: payload.description,
      });

    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* voteDiscussion({ payload, successCb }) {
  try {
    const endpoint = `discussions/${payload.discussion_id}/vote`;
    const res = yield post([endpoint], {
      is_like: payload.is_like,
    });

    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* watchDemoData() {
  yield all([takeLatest('GET_DASHBOARD_DATA_DEMO', getListDataDemo)]);
  yield all([takeEvery('GET_VOTES', getVotes)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('RECORD_VOTE', recordVote)]);
  yield all([takeEvery('GET_DISCUSSIONS', getDiscussions)]);
  yield all([takeEvery('GET_DISCUSSION_DETAIL', getDiscussionDetail)]);
  yield all([takeEvery('GET_PINNED_DISCUSSIONS', getPinnedDiscussions)]);
  yield all([takeEvery('GET_MY_DISCUSSIONS', getMyDiscussions)]);
  yield all([takeEvery('GET_TRENDING_DISCUSSIONS', getTrendingDiscussions)]);
  yield all([takeEvery('SET_DISCUSSION_PIN', setDiscussionPin)]);
  yield all([takeEvery('CREATE_DISCUSSION', createDiscussion)]);
  yield all([takeEvery('SET_REMOVE_NEW', setRemoveNewMark)]);
  yield all([takeEvery('POST_DISCUSSION_COMMENT', postDiscussionComment)]);
  yield all([takeEvery('VOTE_DISCUSSION', voteDiscussion)]);
}
