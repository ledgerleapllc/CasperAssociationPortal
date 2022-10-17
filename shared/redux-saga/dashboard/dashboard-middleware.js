import { put, takeLatest, takeEvery, all, delay } from 'redux-saga/effects';
import qs from 'qs';
import {
  getListCategorySupportSuccess,
  getListCategorySupportError,
  getVoteDetailSuccess,
  getVoteDetailError,
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
    yield delay(500);
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getMyVotes({ payload, successCb }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`users/my-votes?${query}`]);
    yield delay(500);
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
    const res = yield post([`users/votes/${payload.id}`], {
      vote: payload.vote,
    });
    resolve(res.data);
  } catch (error) {
    reject(error);
  }
}

export function* publishDiscussion({ payload, resolve, reject }) {
  try {
    const res = yield post([`discussions/${payload.id}/publish`], {});
    resolve(res.data);
  } catch (error) {
    reject(error);
  }
}

export function* getVerifiedMembers({ successCb }) {
  try {
    const res = yield get([`verified-members/all`]);
    successCb(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getDiscussions({ payload, successCb }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
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
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`discussions/pin?${query}`]);
    yield delay(500);
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getDraftDiscussions({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`discussions/draft?${query}`]);
    yield delay(500);
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* deleteDraftDiscussion({ payload, resolve, reject }) {
  try {
    const res = yield destroy([`discussions/${payload.id}/draft`], {});
    resolve(res.data);
  } catch (error) {
    reject(error);
  }
}

export function* getMyERAs({ resolve, reject }) {
  try {
    const res = yield get([`users/get-my-eras`]);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getMyDiscussions({ payload, resolve, reject }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`discussions/my?${query}`]);
    yield delay(500);
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getTrendingDiscussions({ resolve }) {
  try {
    const res = yield get([`discussions/trending`]);
    resolve(res.data);
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

export function* updateDiscussion({ payload, resolve, reject }) {
  try {
    const res = yield _put([`discussions/${payload.id}`], payload);
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

export function* getMemberCountInfo({ resolve, reject }) {
  try {
    const res = yield get([`member-count-info`]);
    resolve(res.data);
  } catch (error) {
    reject();
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
    limit: payload.limit || 50,
    page: payload.page,
  });
  try {
    const res = yield get([`discussions/${payload.id}/comment?${query}`]);
    yield delay(500);
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

export function* getUserMembershipInfo({ resolve, reject }) {
  try {
    const endpoint = 'users/get-membership-page';
    const res = yield get([endpoint]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getUserFullDashboard({ resolve, reject }) {
  try {
    const endpoint = 'users/get-dashboard';
    const res = yield get([endpoint]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getAdminNodesInfo({ resolve, reject }) {
  try {
    const endpoint = 'admin/users/get-nodes-page';
    const res = yield get([endpoint]);
    resolve(res.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getUserNodesInfo({ resolve, reject }) {
  try {
    const endpoint = 'users/get-nodes-page';
    const res = yield get([endpoint]);
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
    const message = `You uploaded an invalid file type. The avatar must be one of the following file types: .jpeg, jog, png, gif.`;
    const newError = {
      ...error,
    };
    if (
      newError &&
      newError.data &&
      newError.data.data &&
      newError.data.data.errors &&
      newError.data.data.errors.avatar &&
      newError.data.data.errors.avatar.length
    )
      newError.data.data.errors.avatar[0] = message;
    yield put(saveApiResponseError(newError));
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
    resolve({});
  }
}

export function* updateClickCTANotification({ payload, resolve }) {
  try {
    const res = yield _put([`users/notification/${payload.id}/click-cta`]);
    resolve(res);
  } catch (error) {
    resolve({});
  }
}

export function* getLockPageConditions({ resolve, reject }) {
  try {
    const res = yield get(['users/lock-rules']);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getPriceTokenGraphInfo({ resolve, reject }) {
  try {
    const res = yield get(['graph-info']);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* viewedAttachDocument({ payload, resolve }) {
  try {
    const res = yield post([`users/viewed-docs/${payload.id}`]);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getEarningData({ payload, resolve, reject }) {
  try {
    const res = yield get([`/nodes/${payload.node}/earning`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getEarningChart({ payload, resolve, reject }) {
  try {
    const res = yield get([`/nodes/${payload.node}/chart`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* submitContactMessage({ payload, resolve, reject }) {
  try {
    const res = yield post([`/users/contact-us`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchDemoData() {
  yield all([takeLatest('GET_DASHBOARD_DATA_DEMO', getListDataDemo)]);
  yield all([takeEvery('GET_VOTES', getVotes)]);
  yield all([takeEvery('GET_MY_VOTES', getMyVotes)]);
  yield all([takeLatest('GET_VOTE_DETAIL', getVoteDetail)]);
  yield all([takeLatest('PUBLISH_DISCUSSION', publishDiscussion)]);
  yield all([takeLatest('RECORD_VOTE', recordVote)]);
  yield all([takeEvery('GET_VERIFIED_MEMBERS', getVerifiedMembers)]);
  yield all([takeEvery('GET_DISCUSSIONS', getDiscussions)]);
  yield all([takeEvery('GET_DISCUSSION_DETAIL', getDiscussionDetail)]);
  yield all([takeEvery('GET_MEMBER_COUNT_INFO', getMemberCountInfo)]);
  yield all([takeEvery('GET_DISCUSSION_COMMENTS', getDiscussionComments)]);
  yield all([takeEvery('GET_PINNED_DISCUSSIONS', getPinnedDiscussions)]);
  yield all([takeEvery('GET_DRAFT_DISCUSSIONS', getDraftDiscussions)]);
  yield all([takeEvery('DELETE_DRAFT_DISCUSSION', deleteDraftDiscussion)]);
  yield all([takeEvery('GET_MY_DISCUSSIONS', getMyDiscussions)]);
  yield all([takeEvery('GET_MY_ERAS', getMyERAs)]);
  yield all([takeEvery('GET_TRENDING_DISCUSSIONS', getTrendingDiscussions)]);
  yield all([takeEvery('SET_DISCUSSION_PIN', setDiscussionPin)]);
  yield all([takeEvery('CREATE_DISCUSSION', createDiscussion)]);
  yield all([takeEvery('UPDATE_DISCUSSION', updateDiscussion)]);
  yield all([takeEvery('SET_REMOVE_NEW', setRemoveNewMark)]);
  yield all([takeEvery('POST_DISCUSSION_COMMENT', postDiscussionComment)]);
  yield all([takeEvery('VOTE_DISCUSSION', voteDiscussion)]);
  yield all([takeEvery('SUBMIT_NODE', submitNode)]);
  yield all([takeEvery('SUBMIT_DETAIL', submitDetail)]);
  yield all([takeEvery('GET_USER_FULL_DASHBOARD', getUserFullDashboard)]);
  yield all([takeEvery('GET_USER_NODES_INFO', getUserNodesInfo)]);
  yield all([takeEvery('GET_ADMIN_NODES_INFO', getAdminNodesInfo)]);
  yield all([takeEvery('GET_USER_MEMBERSHIP_INFO', getUserMembershipInfo)]);
  yield all([takeEvery('GET_MY_INFO', getMyInfo)]);
  yield all([takeEvery('UPLOAD_AVATAR', uploadAvatar)]);
  yield all([takeEvery('CHECK_PASSWORD', checkPassword)]);
  yield all([takeEvery('UPDATE_USER_SETTINGS', updateUserSettings)]);
  yield all([
    takeEvery('UPDATE_VERIFICATION_DOCUMENTS', uploadVerificationDocuments),
  ]);
  yield all([takeLatest('DISMISS_NOTIFICATION', dismissNotification)]);
  yield all([takeLatest('UPDATE_VIEW_NOTIFICATION', updateViewNotification)]);
  yield all([takeLatest('UPDATE_CLICK_CTA', updateClickCTANotification)]);
  yield all([takeLatest('GET_LOCK_PAGE_CONDITIONS', getLockPageConditions)]);
  yield all([takeLatest('GET_PRICE_TOKEN_GRAPH_INFO', getPriceTokenGraphInfo)]);
  yield all([takeLatest('VIEWED_ATTACH_DOCUMENT', viewedAttachDocument)]);
  yield all([takeLatest('GET_EARNING_DATA', getEarningData)]);
  yield all([takeLatest('GET_EARNING_CHART', getEarningChart)]);
  yield all([takeLatest('SUBMIT_CONTACT_MESSAGE', submitContactMessage)]);
}
