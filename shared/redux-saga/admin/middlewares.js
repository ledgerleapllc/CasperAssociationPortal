/* eslint-disable node/callback-return */
import { put, takeLatest, all, takeEvery, delay } from 'redux-saga/effects';
import qs from 'qs';
import { get, post, put as _put, destroy } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import { ApiService } from '../../../helpers/api/api.service';
import { formatDate } from '../../core/utils';

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
    yield delay(500);
    callback(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getUpgrades({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const query = qs.stringify(payload);
    const res = yield get([`admin/upgrades?${query}`], {
      headers,
    });
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getSingleUpgrade({ id, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/upgrades/${id}`], {
      headers,
    });
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* getUserDetail({ payload, resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/users/${payload}`], {
      headers,
    });
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
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
    yield delay(500);
    successCb(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getVerifications({ payload, resolve }) {
  try {
    const query = qs.stringify({
      page: payload.page,
    });
    const res = yield get([`admin/users/verification?${query}`]);
    yield delay(500);
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getActiveReinstatements({ resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/active-reinstatements`], {
      headers,
    });
    yield delay(500);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject();
  }
}

export function* getHistoryReinstatements({ resolve, reject }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = yield get([`admin/history-reinstatements`], {
      headers,
    });
    yield delay(500);
    resolve(res.data);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject();
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
    yield delay(500);
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
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('start_date', payload.startDate);
    formData.append('start_time', payload.startTime);
    formData.append('end_date', payload.endDate);
    formData.append('end_time', payload.endTime);
    formData.append('timezone', payload.timezone);
    const res = yield post(['admin/ballots'], formData);
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
    resolve(res);
  } catch (error) {
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
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`admin/ballots/${payload.id}/votes?${query}`], {
      headers,
    });
    yield delay(500);
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getSubadmins({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
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
    yield delay(500);
    callback(temp, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getIpHistories({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`admin/teams/${payload.id}/ip-histories?${query}`]);
    yield delay(500);
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getLogUsersViewdDoc({ payload, callback }) {
  try {
    const query = qs.stringify({
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([`admin/ballots/viewed-docs/${payload.id}?${query}`]);
    yield delay(500);
    callback(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* approveReinstatement({ profileId, resolve, reject }) {
  try {
    yield post(['admin/approve-reinstatement'], { profileId });
    resolve();
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* rejectReinstatement({ profileId, resolve, reject }) {
  try {
    yield post(['admin/reject-reinstatement'], { profileId });
    resolve();
  } catch (error) {
    reject(error);
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

export function* reactivateUser({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/${payload.id}/reactivate`]);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* revokeUser({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/users/${payload.id}/revoke`]);
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

export function* getVerificationDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([`admin/users/verification/${payload.id}`]);
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

export function* getAdminERAsByUser({ userId, resolve, reject }) {
  try {
    const res = yield get([`admin/users/all-eras-user/${userId}`]);
    yield delay(500);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getAllAdminERAs({ resolve, reject }) {
  try {
    const res = yield get([`admin/users/all-eras`]);
    yield delay(500);
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
    yield delay(500);
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
    yield delay(500);
    resolve(res.data?.data, res.data?.current_page < res.data?.last_page);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* deletePerk({ payload, resolve, reject }) {
  try {
    yield http.doDelete([`admin/perks/${payload.id}`], {});
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* submitUpgrade({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append('version', payload.version);
    formData.append('activation_date', payload.activation_date);
    formData.append('activation_era', payload.activation_era);
    formData.append('link', payload.link);
    formData.append('notes', payload.notes);
    const res = yield post([`admin/upgrades`], formData);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* updateUpgrade({ payload, resolve, reject }) {
  try {
    const res = yield _put([`admin/upgrades/${payload.id}`], payload);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* deleteUpgrade({ id, resolve, reject }) {
  try {
    yield destroy([`admin/upgrades/${id}`], {});
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* submitPerk({ payload, resolve, reject }) {
  try {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('action_link', payload.action_link);
    formData.append('image', payload.image.file);
    formData.append('start_date', payload.start_date);
    formData.append('end_date', payload.end_date);
    formData.append('start_time', payload.start_time);
    formData.append('end_time', payload.end_time);
    formData.append('setting', payload.setting ? 1 : 0);
    formData.append('timezone', payload.timezone);
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
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('action_link', payload.action_link);
    if (payload.image.file) formData.append('image', payload.image.file);
    formData.append('start_date', payload.start_date);
    formData.append('end_date', payload.end_date);
    formData.append('start_time', payload.start_time);
    formData.append('end_time', payload.end_time);
    formData.append('setting', payload.setting ? 1 : 0);
    formData.append('timezone', payload.timezone);
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
    yield delay(500);
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

export function* updateGlobalSettings({ payload, resolve, reject }) {
  try {
    yield _put([`admin/global-settings`], payload);
    resolve();
  } catch (error) {
    reject();
    yield put(saveApiResponseError(error));
  }
}

export function* bypassKYC({ userId, resolve, reject }) {
  try {
    const res = yield post([`admin/users/bypass-approve-kyc/${userId}`], {});
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* updateCMPStatus({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/cmp-status`], payload);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
  }
}

export function* updateBlockAccess({ payload, resolve, reject }) {
  try {
    const res = yield post([`admin/block-access`], payload);
    resolve(res);
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject(error);
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
      res.data.start_date = formatDate(res.data.start_date, 'dd/MM/yyyy');
    if (res.data.end_date)
      res.data.end_date = formatDate(res.data.end_date, 'dd/MM/yyyy');
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
    yield delay(500);
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
      limit: payload.limit || 50,
      page: payload.page,
    });
    const res = yield get([
      `admin/notification/${payload.id}/view-logs?${query}`,
    ]);
    yield delay(500);
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
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('start_date', payload.startDate);
    formData.append('start_time', payload.startTime);
    formData.append('end_date', payload.endDate);
    formData.append('end_time', payload.endTime);
    formData.append('timezone', payload.timezone);
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

export function* getNodesByUser({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`users/list-node-by?${query}`]);
    yield delay(500);
    resolve(res.data);
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

export function* getGlobalSettings({ resolve, reject }) {
  try {
    const res = yield get(['admin/global-settings']);
    yield delay(500);
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
  yield all([takeLatest('GET_UPGRADES', getUpgrades)]);
  yield all([takeLatest('GET_SINGLE_UPGRADE', getSingleUpgrade)]);
  yield all([takeLatest('REMOVE_INTAKE', removeIntake)]);
  yield all([takeLatest('GET_USER_DETAIL', getUserDetail)]);
  yield all([takeEvery('GET_LIST_INTAKE', getIntake)]);
  yield all([takeEvery('GET_BALLOTS', getBallots)]);
  yield all([takeEvery('GET_ACTIVE_REINSTATEMENTS', getActiveReinstatements)]);
  yield all([
    takeEvery('GET_HISTORY_REINSTATEMENTS', getHistoryReinstatements),
  ]);
  yield all([takeLatest('SUBMIT_BALLOT', submitBallot)]);
  yield all([takeLatest('SUBMIT_PERK', submitPerk)]);
  yield all([takeLatest('SUBMIT_UPGRADE', submitUpgrade)]);
  yield all([takeLatest('UPDATE_UPGRADE', updateUpgrade)]);
  yield all([takeLatest('DELETE_UPGRADE', deleteUpgrade)]);
  yield all([takeLatest('EDIT_PERK', editPerk)]);
  yield all([takeLatest('DELETE_PERK', deletePerk)]);
  yield all([takeLatest('GET_BALLOT_DETAIL', getBallotDetail)]);
  yield all([takeLatest('GET_PERK_DETAIL', getPerkDetail)]);
  yield all([takeLatest('GET_ACTIVE_PERK_DETAIL', getActivePerkDetail)]);
  yield all([takeLatest('GET_BALLOT_VOTES', getBallotVotes)]);
  yield all([takeLatest('CANCEL_BALLOT', cancelBallot)]);
  yield all([takeLatest('GET_SUBADMINS', getSubadmins)]);
  yield all([takeLatest('REGISTER_SUB_ADMIN', registerSubAdmin)]);
  yield all([takeLatest('GET_IP_HISTORIES', getIpHistories)]);
  yield all([takeLatest('GET_LOG_USERS_VIEWED_DOC', getLogUsersViewdDoc)]);
  yield all([takeLatest('APPROVE_REINSTATEMENT', approveReinstatement)]);
  yield all([takeLatest('REJECT_REINSTATEMENT', rejectReinstatement)]);
  yield all([takeLatest('INVITE_SUBADMIN', inviteSubadmin)]);
  yield all([takeLatest('REVOKE_SUBADMIN', revokeSubadmin)]);
  yield all([takeLatest('UNDO_REVOKE_SUBADMIN', undoRevokeSubadmin)]);
  yield all([takeLatest('RESET_SUBADMIN_PASSWORD', resetSubadminPassword)]);
  yield all([takeLatest('RESEND_INVITE_SUBADMIN', resendInviteLink)]);
  yield all([
    takeLatest('CHANGE_SUBADMIN_PERMISSIONS', changeSubadminPermissions),
  ]);
  yield all([takeLatest('APPROVE_USER', approveUser)]);
  yield all([takeLatest('REACTIVATE_USER', reactivateUser)]);
  yield all([takeLatest('REVOKE_USER', revokeUser)]);
  yield all([takeLatest('BAN_USER', banUser)]);
  yield all([takeLatest('RESET_USER', resetUser)]);
  yield all([takeLatest('GET_LIST_VERIFICATIONS', getVerifications)]);
  yield all([
    takeLatest('GET_LIST_VERIFICATION_DETAIL', getVerificationDetail),
  ]);
  yield all([takeLatest('RESET_USER_KYC', resetUserKYC)]);
  yield all([takeLatest('APPROVED_DOCUMENTS', approveDocuments)]);
  yield all([takeLatest('GET_EMAILER_DATA', getEmailerData)]);
  yield all([takeLatest('ADD_EMAILER_ADMIN', addEmailerAdmin)]);
  yield all([takeLatest('DELETE_EMAILER_ADMIN', deleteEmailerAdmin)]);
  yield all([takeEvery('GEt_ADMIN_ERAS_BY_USER', getAdminERAsByUser)]);
  yield all([takeEvery('GET_ALL_ADMIN_ERAS', getAllAdminERAs)]);
  yield all([takeEvery('GET_LIST_PERKS', getListPerks)]);
  yield all([takeEvery('GET_ACTIVE_PERKS', getActivePerks)]);
  yield all([takeEvery('GET_LIST_PERK_ENGAGEMENT', getListPerkEngagements)]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_USER', updateEmailerTriggerUser),
  ]);
  yield all([
    takeLatest('UPDATE_EMAILER_TRIGGER_ADMIN', updateEmailerTriggerAdmin),
  ]);
  yield all([takeLatest('UPDATE_GLOBAL_SETTINGS', updateGlobalSettings)]);
  yield all([takeLatest('UPDATE_BLOCK_ACCESS', updateBlockAccess)]);
  yield all([takeLatest('UPDATE_CMP_STATUS', updateCMPStatus)]);
  yield all([takeLatest('BYPASS_KYC', bypassKYC)]);
  yield all([takeLatest('ADD_NOTIFICATION', addNotification)]);
  yield all([takeLatest('EDIT_NOTIFICATION', editNotification)]);
  yield all([takeLatest('GET_NOTIFICATION_DETAIL', getNotificationDetail)]);
  yield all([takeLatest('GET_LIST_NOTIFICATIONS', getListNotifications)]);
  yield all([takeLatest('GET_ADMIN_DASHBOARD', getAdminDashboard)]);
  yield all([takeEvery('GET_NODES_BY_USER', getNodesByUser)]);
  yield all([
    takeLatest('GET_NOTIFICATION_VIEW_LOGS', getNotificationViewLogs),
  ]);
  yield all([
    takeLatest('GET_HIGH_PRIORITY_NOTIFICATION', getHighPriorityNotification),
  ]);
  yield all([takeLatest('GET_GLOBAL_SETTINGS', getGlobalSettings)]);
  yield all([takeLatest('UPDATE_LOCK_PAGE_RULES', updateLockPageRule)]);
  yield all([takeLatest('ADD_RECIPIENT', addRecipient)]);
  yield all([takeLatest('REMOVE_RECIPIENT', removeRecipient)]);
  yield all([takeLatest('CHANGE_MEMBERSHIP_FILE', changeMembershipFile)]);
  yield all([takeLatest('UPDATE_BALLOT', updateBallot)]);
}
