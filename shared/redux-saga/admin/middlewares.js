import { put, takeLatest, all, takeEvery, delay } from 'redux-saga/effects';
import qs from 'qs';
import { destroy, get, post, put as _put } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import {
  getListMembersSuccess,
  getUserDetailSuccess,
  getUserKYCInfoSuccess,
  getListIntakeSuccess,
  getListIntakeError,
  cancelBallotSuccess,
  cancelBallotError,
} from './actions';

export function* getListMembers({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify(payload);
    const res = yield get([`admin/users?${query}`], {
      headers,
    });
    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
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

export function* getIntake({ payload, successCb }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify({
      page: payload.page,
    });
    const res = yield get([`admin/users/intakes?${query}`], {
      headers,
    });
    yield delay(500); // => this need for scroll loadmore.
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
    yield put(getListIntakeSuccess(res.data));
  } catch (error) {
    yield put(getListIntakeError(error));
    yield put(saveApiResponseError(error));
  }
}

export function* getBallots({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify(payload);
    const res = yield get([`admin/ballots?${query}`], {
      headers,
    });
    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* submitBallot({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    Array.from(payload.files).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append(`title`, payload.title);
    formData.append(`description`, payload.description);
    formData.append(`time`, payload.time);
    formData.append(`time_unit`, payload.time_unit);
    const res = yield post([`admin/ballots`], formData, {
      headers,
    });
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getBallotDetail({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/ballots`, payload], {
      headers,
    });
    callback(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* cancelBallot({ payload, callback, finallyCallback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield post(
      [`admin/ballots/${payload}/cancel`],
      {},
      {
        headers,
      }
    );
    yield put(cancelBallotSuccess(res));
    callback();
  } catch (error) {
    yield put(cancelBallotError(error));
    yield put(saveApiResponseError(error));
  }
}

export function* getBallotVotes({ payload, callback }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`admin/ballots/${payload.id}/votes?${query}`], {
      headers,
    });
    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getSubadmins({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`admin/teams?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* inviteSubadmin({ email, callback }) {
  try {
    const res = yield post(['admin/teams/invite'], { email });
    callback(res.data?.invited);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* revokeSubadmin({ id, callback }) {
  try {
    yield destroy([`admin/teams/${id}/revoke`]);
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* resetSubadminPassword({ id, callback }) {
  try {
    yield _put([`admin/teams/${id}/reset-password`]);
    callback();
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* resendInviteLink({ id, callback }) {
  try {
    yield _put([`admin/teams/${id}/reinvite`]);
    callback();
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
  yield all([takeEvery('GET_LIST_INTAKE', getIntake)]);
  yield all([takeEvery('GET_BALLOTS', getBallots)]);
  yield all([takeLatest('SUBMIT_BALLOT', submitBallot)]);
  yield all([takeLatest('GET_BALLOT_DETAIL', getBallotDetail)]);
  yield all([takeLatest('GET_BALLOT_VOTES', getBallotVotes)]);
  yield all([takeLatest('CANCEL_BALLOT', cancelBallot)]);
  yield all([takeLatest('GET_SUBADMINS', getSubadmins)]);
  yield all([takeLatest('INVITE_SUBADMIN', inviteSubadmin)]);
  yield all([takeLatest('REVOKE_SUBADMIN', revokeSubadmin)]);
  yield all([takeLatest('RESET_SUBADMIN_PASSWORD', resetSubadminPassword)]);
  yield all([takeLatest('RESEND_INVITE_SUBADMIN', resendInviteLink)]);
}
