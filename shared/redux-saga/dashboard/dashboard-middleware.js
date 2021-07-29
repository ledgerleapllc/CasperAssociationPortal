import { put, takeLatest, takeEvery, all, delay } from 'redux-saga/effects';
import qs from 'qs';
import {
  getListCategorySupportSuccess,
  getListCategorySupportError,
  getVoteDetailSuccess,
  getVoteDetailError,
  recordVoteSuccess,
  recordVoteError,
  getNotificationsSuccess,
  getNotificationsError
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

export function* getMyVotes({ payload, successCb }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`users/my-votes?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getVoteDetail({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`users/votes/${payload}`], {
      headers,
    });
    yield put(getVoteDetailSuccess(res.data));
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(getVoteDetailError(error));
  }
}

export function* recordVote({ payload, resolve, reject }) {
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
    resolve();
  } catch (error) {
    reject();
    yield put(recordVoteError(error));
  }
}

export function* getDiscussions({ payload, successCb }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`discussions/all?${query}`]);
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getPinnedDiscussions({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`discussions/pin?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getMyDiscussions({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`discussions/my?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getTrendingDiscussions({ payload, resolve }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`discussions/trending?${query}`]);
    resolve(res.data.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* setDiscussionPin({ id }) {
  try {
    yield post([`discussions/${id}/pin`]);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* createDiscussion({ payload, resolve, reject }) {
  try {
    const res = yield post([`discussions/new`], payload);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* setRemoveNewMark({ id }) {
  try {
    yield destroy([`discussions/${id}/new`]);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getDiscussionDetail({ id, resolve, reject }) {
  try {
    const res = yield get([`discussions/detail/${id}`]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getDiscussionComments({ payload, resolve }) {
  const query = qs.stringify({
    limit: payload.limit || 10,
    page: payload.page,
  });
  try {
    const res = yield get([`discussions/${payload.id}/comment?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* postDiscussionComment({ payload, resolve, reject }) {
  try {
    let res;
    const endpoint = `discussions/${payload.discussion_id}/comment`;
    if (!payload.comment_id)
      res = yield post([endpoint], {
        description: payload.description,
      });
    else
      res = yield _put([endpoint], {
        comment_id: payload.comment_id,
        description: payload.description,
      });

    resolve(res.data);
  } catch (error) {
    reject();
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

export function* submitNode({ payload, resolve, reject }) {
  try {
    const endpoint = 'users/verification/submit-node';
    const res = yield post([endpoint], payload);

    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* submitDetail({ payload, resolve, reject }) {
  try {
    const endpoint = 'users/verification/submit-detail';
    const res = yield post([endpoint], payload);

    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* uploadVerificationDocuments({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    Array.from(payload).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    const res = yield post(['users/verification/upload-document'], formData);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getMyInfo({ resolve, reject }) {
  try {
    const endpoint = 'users/profile';
    const res = yield get([endpoint]);

    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* uploadAvatar({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append(`avatar`, payload.file);
    const res = yield post([`users/upload-avatar`], formData);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* checkPassword({ payload, resolve, reject }) {
  try {
    const endpoint = 'users/check-password';
    const res = yield post([endpoint], {
      current_password: payload.current_password,
    });

    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* updateUserSettings({ payload, resolve, reject }) {
  try {
    const body = {
      twoFA_login: payload.twoFA_login,
    };
    if (payload.username) body.username = payload.username;
    if (payload.email) body.email = payload.email;
    if (payload.password) body.new_password = payload.password;

    yield post(['users/settings'], body);
    delete body.new_password;
    body.new_email = body.email;
    delete body.email;
    resolve(body);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getNotifications({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({
      type: payload?.type,
    });
    const res = yield get([`users/notification?${query}`]);
    if (payload.type === 'Popup') {
      yield put(getNotificationsSuccess(res.data));
    }
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(getNotificationsError(error));
    yield put(saveApiResponseError(error));
  }
}

export function* dismissNotification({ payload, resolve }) {
  try {
    const res = yield _put([`users/notification/${payload.id}/dismiss`]);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* updateViewNotification({ payload, resolve }) {
  try {
    const res = yield _put([`users/notification/${payload.id}/view`]);
    resolve(res);
  } catch (error) {
    // yield put(saveApiResponseError(error));
  }
}

export function* updateClickCTANotification({ payload, resolve }) {
  try {
    const res = yield _put([`users/notification/${payload.id}/click-cta`]);
    resolve(res);
  } catch (error) {
    // yield put(saveApiResponseError(error));
  }
}

export function* watchDemoData() {
  yield all([takeLatest('GET_DASHBOARD_DATA_DEMO', getListDataDemo)]);
  yield all([takeEvery('GET_VOTES', getVotes)]);
  yield all([takeEvery('GET_MY_VOTES', getMyVotes)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('RECORD_VOTE', recordVote)]);
  yield all([takeEvery('GET_DISCUSSIONS', getDiscussions)]);
  yield all([takeEvery('GET_DISCUSSION_DETAIL', getDiscussionDetail)]);
  yield all([takeEvery('GET_DISCUSSION_COMMENTS', getDiscussionComments)]);
  yield all([takeEvery('GET_PINNED_DISCUSSIONS', getPinnedDiscussions)]);
  yield all([takeEvery('GET_MY_DISCUSSIONS', getMyDiscussions)]);
  yield all([takeEvery('GET_TRENDING_DISCUSSIONS', getTrendingDiscussions)]);
  yield all([takeEvery('SET_DISCUSSION_PIN', setDiscussionPin)]);
  yield all([takeEvery('CREATE_DISCUSSION', createDiscussion)]);
  yield all([takeEvery('SET_REMOVE_NEW', setRemoveNewMark)]);
  yield all([takeEvery('POST_DISCUSSION_COMMENT', postDiscussionComment)]);
  yield all([takeEvery('VOTE_DISCUSSION', voteDiscussion)]);
  yield all([takeEvery('SUBMIT_NODE', submitNode)]);
  yield all([takeEvery('SUBMIT_DETAIL', submitDetail)]);
  yield all([takeEvery('GET_MY_INFO', getMyInfo)]);
  yield all([takeEvery('UPLOAD_AVATAR', uploadAvatar)]);
  yield all([takeEvery('CHECK_PASSWORD', checkPassword)]);
  yield all([takeEvery('UPDATE_USER_SETTINGS', updateUserSettings)]);
  yield all([
    takeEvery('UPDATE_VERIFICATION_DOCUMENTS', uploadVerificationDocuments),
  ]);
  yield all([takeEvery('GET_NOTIFICATIONS', getNotifications)]);
  yield all([takeLatest('DISMISS_NOTIFICATION', dismissNotification)]);
  yield all([takeLatest('UPDATE_VIEW_NOTIFICATION', updateViewNotification)]);
  yield all([takeLatest('UPDATE_CLICK_CTA', updateClickCTANotification)]);
}
