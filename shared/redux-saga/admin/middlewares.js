import { put, takeLatest, all, takeEvery, delay } from 'redux-saga/effects';
import qs from 'qs';
import { get, post, put as _put } from '../../core/saga-api';
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
import { ApiService } from '../../../helpers/api/api.service';

const http = new ApiService();

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

export function* getVerifications({ payload, resolve }) {
  try {
    const query = qs.stringify({
      page: payload.page,
    });
    const res = yield get([`admin/users/verification?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(getListIntakeError(error));
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

export function* cancelBallot({ payload, resolve, reject }) {
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
    resolve(res);
  } catch (error) {
    yield put(cancelBallotError(error));
    yield put(saveApiResponseError(error));
    reject(error);
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

export function* approveUser({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/intakes/${payload.id}/approve`]);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* resetUser({ payload, resolve, reject }) {
  try {
    const { message, id } = payload;
    const res = yield post([`admin/users/intakes/${id}/reset`], { message });
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* banUser({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/${payload.id}/ban`]);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* banVerifiedUser({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/${payload.id}/deny-ban`]);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getVerificationDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/users/verification/${payload.id}`]);
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* approveUserAML({ payload, resolve, reject }) {
  try {
    const res = yield post([`/admin/users/${payload.id}/approve-aml`]);
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* resetUserAML({ payload, resolve, reject }) {
  try {
    const { message, id } = payload;
    const res = yield post([`/admin/users/${id}/reset-aml`], { message });
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* approveUserKYC({ payload, resolve, reject }) {
  try {
    const res = yield post([`/admin/users/${payload.id}/approve-kyc`]);
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* resetUserKYC({ payload, resolve, reject }) {
  try {
    const { message, id } = payload;
    const res = yield post([`/admin/users/${id}/reset-kyc`], { message });
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* approveDocuments({ payload, resolve, reject }) {
  try {
    const { id } = payload;
    const res = yield post([`/admin/users/${id}/approve-document`], {});
    resolve(res?.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getEmailerData({ resolve, reject }) {
  try {
    const res = yield get([`admin/emailer-data`]);
    resolve(res?.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* addEmailerAdmin({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/emailer-admin`], payload);
    resolve(res?.data);
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* deleteEmailerAdmin({ payload, resolve, reject }) {
  try {
    const res = yield http.doDelete([`admin/emailer-admin/${payload.id}`], {});
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* updateEmailerTriggerUser({ payload, resolve, reject }) {
  try {
    const res = yield _put(
      [`admin/emailer-trigger-user/${payload.id}`],
      payload.data
    );
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* updateEmailerTriggerAdmin({ payload, resolve, reject }) {
  try {
    const res = yield _put(
      [`admin/emailer-trigger-admin/${payload.id}`],
      payload.data
    );
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getUserMetrics({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/metrics/${payload.id}`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updateUserMetrics({ payload, resolve, reject }) {
  try {
    const body = {};
    if (payload.uptime) body.uptime = payload.uptime;
    if (payload.block_height_average)
      body.block_height_average = payload.block_height_average;
    if (payload.update_responsiveness)
      body.update_responsiveness = payload.update_responsiveness;
    if (payload.peers) body.peers = payload.peers;
    const res = yield _put([`admin/metrics/${payload.id}`], body);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchAdmin() {
  yield all([takeLatest('GET_LIST_MEMBER', getListMembers)]);
  yield all([takeLatest('GET_USER_DETAIL', getUserDetail)]);
  yield all([takeLatest('GET_USER_METRICS', getUserMetrics)]);
  yield all([takeLatest('UPDATE_USER_METRICS', updateUserMetrics)]);
  yield all([takeLatest('GET_USER_KYC_INFO', getUserKYCInfo)]);
  yield all([takeLatest('APPROVE_KYC', approveKYC)]);
  yield all([takeLatest('DENY_KYC', denyKYC)]);
  yield all([takeEvery('GET_LIST_INTAKE', getIntake)]);
  yield all([takeEvery('GET_BALLOTS', getBallots)]);
  yield all([takeLatest('SUBMIT_BALLOT', submitBallot)]);
  yield all([takeLatest('GET_BALLOT_DETAIL', getBallotDetail)]);
  yield all([takeLatest('GET_BALLOT_VOTES', getBallotVotes)]);
  yield all([takeLatest('CANCEL_BALLOT', cancelBallot)]);
  yield all([takeLatest('APPROVE_USER', approveUser)]);
  yield all([takeLatest('BAN_USER', banUser)]);
  yield all([takeLatest('BAN_VERIFIED_USER', banVerifiedUser)]);
  yield all([takeLatest('RESET_USER', resetUser)]);
  yield all([takeLatest('GET_LIST_VERIFICATIONS', getVerifications)]);
  yield all([
    takeLatest('GET_LIST_VERIFICATION_DETAIL', getVerificationDetail),
  ]);
  yield all([takeLatest('APPROVE_USER_AML', approveUserAML)]);
  yield all([takeLatest('RESET_USER_AML', resetUserAML)]);
  yield all([takeLatest('APPROVE_USER_KYC', approveUserKYC)]);
  yield all([takeLatest('RESET_USER_KYC', resetUserKYC)]);
  yield all([takeLatest('APPROVED_DOCUMENTS', approveDocuments)]);
  yield all([takeLatest('GET_EMAILER_DATA', getEmailerData)]);
  yield all([takeLatest('ADD_EMAILER_ADMIN', addEmailerAdmin)]);
  yield all([takeLatest('DELETE_EMAILER_ADMIN', deleteEmailerAdmin)]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_USER', updateEmailerTriggerUser),
  ]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_ADMIN', updateEmailerTriggerAdmin),
  ]);
}
