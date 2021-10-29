/* eslint-disable node/callback-return */
import { put, takeLatest, all, takeEvery, delay } from 'redux-saga/effects';
import qs from 'qs';
import { get, post, put as _put, destroy } from '../../core/saga-api';
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
import { formatDate } from '../../core/utils';
import { DEFAULT_BASE_BLOCKS } from '../../core/constants';

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
    const formData = new FormData();
    Array.from(payload.files).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append(`title`, payload.title);
    formData.append(`description`, payload.description);
    formData.append(`time`, payload.time);
    formData.append(`time_unit`, payload.time_unit);
    const res = yield post([`admin/ballots`], formData);
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

export function* getSubadmins({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`admin/teams?${query}`]);
    const temp = res.data?.data.map(x => {
      const xTemp = x;
      const permissions = {};
      x.permissions.forEach(y => {
        permissions[y.name] = y.is_permission;
      });
      xTemp.permissions = permissions;
      return xTemp;
    });

    yield delay(500); // => this need for scroll loadmore.
    callback(temp, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getIpHistories({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`admin/teams/${payload.id}/ip-histories?${query}`]);

    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getLogUsersViewdDoc({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 10,
      page: payload.page,
    });
    const res = yield get([`admin/ballots/viewed-docs/${payload.id}?${query}`]);

    yield delay(500); // => this need for scroll loadmore.
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* inviteSubadmin({ email, resolve, reject }) {
  try {
    const res = yield post(['admin/teams/invite'], { email });
    resolve(res.data?.invited);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* revokeSubadmin({ id, resolve, reject }) {
  try {
    yield post([`admin/teams/${id}/revoke`]);
    resolve();
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* undoRevokeSubadmin({ id, resolve, reject }) {
  try {
    const res = yield post([`admin/teams/${id}/undo-revoke`]);
    resolve(res?.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* resetSubadminPassword({ id, resolve, reject }) {
  try {
    yield post([`admin/teams/${id}/reset-password`]);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* resendInviteLink({ id, resolve, reject }) {
  try {
    yield post([`admin/teams/${id}/re-invite`]);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* changeSubadminPermissions({ id, payload, callback }) {
  try {
    yield _put([`admin/teams/${id}/change-permissions`], payload);
    callback();
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

export function* activateVerifiedStatus({ payload, resolve, reject }) {
  try {
    const { id } = payload;
    const res = yield post([`/admin/users/${id}/active`]);
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
    yield http.doDelete([`admin/emailer-admin/${payload.id}`], {});
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* updateEmailerTriggerUser({ payload, resolve, reject }) {
  try {
    yield _put([`admin/emailer-trigger-user/${payload.id}`], payload.data);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* updateEmailerTriggerAdmin({ payload, resolve, reject }) {
  try {
    yield _put([`admin/emailer-trigger-admin/${payload.id}`], payload.data);
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

export function* getListPerks({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`admin/perks?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getActivePerks({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`perks?${query}`]);
    res.data.data = res.data.data.map(x => ({
      ...x,
      image: { url: x.image_url },
    }));
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* submitPerk({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append(`title`, payload.title);
    formData.append(`content`, payload.content);
    formData.append(`action_link`, payload.action_link);
    formData.append(`image`, payload.image.file);
    formData.append(`start_date`, payload.start_date);
    formData.append(`end_date`, payload.end_date);
    formData.append(`setting`, payload.setting ? 1 : 0);
    const res = yield post([`admin/perks`], formData);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* editPerk({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append(`title`, payload.title);
    formData.append(`content`, payload.content);
    formData.append(`action_link`, payload.action_link);
    if (payload.image.file) formData.append(`image`, payload.image.file);
    formData.append(`start_date`, payload.start_date);
    formData.append(`end_date`, payload.end_date);
    formData.append(`setting`, payload.setting ? 1 : 0);
    const res = yield post([`admin/perks/update/${payload.id}`], formData);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getPerkDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/perks`, payload.id]);
    res.data.setting = res.data.setting === 1;
    if (res.data.start_date)
      res.data.start_date = formatDate(
        new Date(res.data.start_date),
        'MM/dd/yyyy'
      );
    if (res.data.end_date)
      res.data.end_date = formatDate(new Date(res.data.end_date), 'MM/dd/yyyy');
    res.data.image = {
      url: res.data.image_url,
      name: res.data.image,
      file: null,
    };
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getListPerkEngagements({ payload, resolve, reject }) {
  try {
    const { id, ...params } = payload;
    const query = qs.stringify(params);
    const res = yield get([`admin/perks/${id}/result?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getActivePerkDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`perks`, payload.id]);
    res.data.setting = res.data.setting === 1;
    res.data.start_date = formatDate(
      new Date(res.data.start_date),
      'dd/MM/yyyy'
    );
    res.data.end_date = formatDate(new Date(res.data.end_date), 'dd/MM/yyyy');
    res.data.image = {
      url: res.data.image_url,
      name: res.data.image,
      file: null,
    };
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getWarningMetrics({ resolve, reject }) {
  try {
    const res = yield get(['admin/monitoring-criteria']);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* updateWarningMetrics({ payload, resolve, reject }) {
  try {
    yield _put([`admin/monitoring-criteria/${payload.type}`], payload.data);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* addNotification({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/notification`], payload);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* editNotification({ payload, resolve, reject }) {
  try {
    const res = yield _put([`admin/notification/${payload.id}`], payload.data);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getNotificationDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/notification`, payload.id]);
    res.data.setting = res.data.setting === 1;
    if (res.data.start_date)
      res.data.start_date = formatDate(
        new Date(res.data.start_date),
        'dd/MM/yyyy'
      );
    if (res.data.end_date)
      res.data.end_date = formatDate(new Date(res.data.end_date), 'dd/MM/yyyy');
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getListNotifications({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`admin/notification?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(
      res.data?.notifications?.data,
      res.data?.notifications?.current_page <
        res.data?.notifications?.last_page,
      res.data?.ids,
      res.data?.total_member
    );
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getNotificationViewLogs({ payload, resolve }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 5,
      page: payload.page,
    });
    const res = yield get([
      `admin/notification/${payload.id}/view-logs?${query}`,
    ]);
    yield delay(500); // => this need for scroll loadmore.
    const viewPercent =
      !res.data?.notification?.total_views || !res.data?.total_member
        ? 0
        : Math.round(
            (res.data?.notification?.total_views / res.data?.total_member) * 100
          );
    resolve(
      res.data?.users?.data,
      res.data?.users?.current_page < res.data?.users?.last_page,
      viewPercent
    );
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getHighPriorityNotification({ resolve, reject }) {
  try {
    const res = yield get([`admin/notification/high-priority`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updateBallot({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    Array.from(payload.files).forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    payload.file_ids_remove.forEach((id, index) => {
      formData.append(`file_ids_remove[${index}]`, id);
    });
    formData.append(`title`, payload.title);
    formData.append(`description`, payload.description);
    formData.append(`time`, payload.time);
    formData.append(`time_unit`, payload.time_unit);
    const res = yield post([`admin/ballots/${payload.id}/edit`], formData);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getAdminDashboard({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`admin/dashboard?${query}`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getNodesFromAdmin({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`admin/list-node?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* registerSubAdmin({ payload, resolve, reject }) {
  try {
    const res = yield post([`auth/register-sub-admin`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getLockPageRules({ resolve, reject }) {
  try {
    const res = yield get(['admin/lock-rules']);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* updateLockPageRule({ payload, resolve, reject }) {
  try {
    yield _put([`admin/lock-rules/${payload.id}`], payload.data);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* getNodeDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/node/${payload}`]);
    let block_height_average =
      DEFAULT_BASE_BLOCKS -
      (res.data?.max_block_height_average - res.data?.block_height_average);
    if (block_height_average < 0) {
      block_height_average = 0;
    }
    const temp = {
      ...res.data,
      uptime: res.data?.uptime || 0,
      block_height_average,
      peers: res.data?.peers || 0,
      update_responsiveness: res.data?.update_responsiveness || 0,
      current_block_height:
        DEFAULT_BASE_BLOCKS - block_height_average > 0
          ? DEFAULT_BASE_BLOCKS - block_height_average
          : 0,
    };
    resolve(temp);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* removeIntake({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/${payload.id}/remove`], {});
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* addRecipient({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/contact-recipients`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* removeRecipient({ payload, resolve, reject }) {
  try {
    const res = yield destroy([`admin/contact-recipients/${payload.id}`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* listRecipients({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`admin/contact-recipients?${query}`]);
    yield delay(500); // => this need for scroll loadmore.
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getMembershipFile({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/membership-file`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* changeMembershipFile({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append(`file`, payload.file);
    const res = yield post([`admin/membership-file`], formData);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchAdmin() {
  yield all([takeLatest('GET_LIST_MEMBER', getListMembers)]);
  yield all([takeLatest('REMOVE_INTAKE', removeIntake)]);
  yield all([takeLatest('GET_USER_DETAIL', getUserDetail)]);
  yield all([takeLatest('GET_USER_METRICS', getUserMetrics)]);
  yield all([takeLatest('UPDATE_USER_METRICS', updateUserMetrics)]);
  yield all([takeLatest('GET_USER_KYC_INFO', getUserKYCInfo)]);
  yield all([takeLatest('APPROVE_KYC', approveKYC)]);
  yield all([takeLatest('DENY_KYC', denyKYC)]);
  yield all([takeEvery('GET_LIST_INTAKE', getIntake)]);
  yield all([takeEvery('GET_BALLOTS', getBallots)]);
  yield all([takeLatest('SUBMIT_BALLOT', submitBallot)]);
  yield all([takeLatest('SUBMIT_PERK', submitPerk)]);
  yield all([takeLatest('EDIT_PERK', editPerk)]);
  yield all([takeLatest('GET_BALLOT_DETAIL', getBallotDetail)]);
  yield all([takeLatest('GET_PERK_DETAIL', getPerkDetail)]);
  yield all([takeLatest('GET_ACTIVE_PERK_DETAIL', getActivePerkDetail)]);
  yield all([takeLatest('GET_BALLOT_VOTES', getBallotVotes)]);
  yield all([takeLatest('CANCEL_BALLOT', cancelBallot)]);
  yield all([takeLatest('GET_SUBADMINS', getSubadmins)]);
  yield all([takeLatest('REGISTER_SUB_ADMIN', registerSubAdmin)]);
  yield all([takeLatest('GET_IP_HISTORIES', getIpHistories)]);
  yield all([takeLatest('GET_LOG_USERS_VIEWED_DOC', getLogUsersViewdDoc)]);
  yield all([takeLatest('INVITE_SUBADMIN', inviteSubadmin)]);
  yield all([takeLatest('REVOKE_SUBADMIN', revokeSubadmin)]);
  yield all([takeLatest('UNDO_REVOKE_SUBADMIN', undoRevokeSubadmin)]);
  yield all([takeLatest('RESET_SUBADMIN_PASSWORD', resetSubadminPassword)]);
  yield all([takeLatest('RESEND_INVITE_SUBADMIN', resendInviteLink)]);
  yield all([
    takeLatest('CHANGE_SUBADMIN_PERMISSIONS', changeSubadminPermissions),
  ]);
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
  yield all([takeLatest('ACTIVATE_VERIFIED_STATUS', activateVerifiedStatus)]);
  yield all([takeLatest('APPROVED_DOCUMENTS', approveDocuments)]);
  yield all([takeLatest('GET_EMAILER_DATA', getEmailerData)]);
  yield all([takeLatest('ADD_EMAILER_ADMIN', addEmailerAdmin)]);
  yield all([takeLatest('DELETE_EMAILER_ADMIN', deleteEmailerAdmin)]);
  yield all([takeEvery('GET_LIST_PERKS', getListPerks)]);
  yield all([takeEvery('GET_ACTIVE_PERKS', getActivePerks)]);
  yield all([takeEvery('GET_LIST_PERK_ENGAGEMENT', getListPerkEngagements)]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_USER', updateEmailerTriggerUser),
  ]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_ADMIN', updateEmailerTriggerAdmin),
  ]);
  yield all([takeLatest('GET_WARNING_METRICS', getWarningMetrics)]);
  yield all([takeLatest('UPDATE_WARNING_METRICS', updateWarningMetrics)]);
  yield all([takeLatest('ADD_NOTIFICATION', addNotification)]);
  yield all([takeLatest('EDIT_NOTIFICATION', editNotification)]);
  yield all([takeLatest('GET_NOTIFICATION_DETAIL', getNotificationDetail)]);
  yield all([takeLatest('GET_LIST_NOTIFICATIONS', getListNotifications)]);
  yield all([takeLatest('GET_ADMIN_DASHBOARD', getAdminDashboard)]);
  yield all([takeEvery('GET_NODES_FROM_ADMIN', getNodesFromAdmin)]);
  yield all([
    takeLatest('GET_NOTIFICATION_VIEW_LOGS', getNotificationViewLogs),
  ]);
  yield all([
    takeLatest('GET_HIGH_PRIORITY_NOTIFICATION', getHighPriorityNotification),
  ]);
  yield all([takeLatest('GET_LOCK_PAGE_RULES', getLockPageRules)]);
  yield all([takeLatest('UPDATE_LOCK_PAGE_RULES', updateLockPageRule)]);
  yield all([takeLatest('GET_NODE_DETAIL', getNodeDetail)]);
  yield all([takeLatest('ADD_RECIPIENT', addRecipient)]);
  yield all([takeLatest('REMOVE_RECIPIENT', removeRecipient)]);
  yield all([takeLatest('LIST_RECIPIENTS', listRecipients)]);
  yield all([takeLatest('GET_MEMBERSHIP_FILE', getMembershipFile)]);
  yield all([takeLatest('CHANGE_MEMBERSHIP_FILE', changeMembershipFile)]);
  yield all([takeLatest('UPDATE_BALLOT', updateBallot)]);
}
