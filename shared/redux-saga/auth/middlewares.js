/* eslint-disable node/callback-return */
import { put, takeLatest, all, delay } from 'redux-saga/effects';
import qs from 'qs';
import { post, get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import { removeToken, setToken } from '../../../helpers/api/auth.service';
import {
  clearUser,
  fetchUserInfoError,
  fetchUserInfoSuccess,
  setUser,
  updateUser,
  setNotifications,
  clearNotifications,
  setPermissions,
  setPagePermissions,
  clearPermissions,
  clearPagePermissions,
} from './actions';
import { clearLetter, clearOwnerNodes } from '../onboard/actions';

export function* loginApp({ payload, callback, resetSubmitting }) {
  try {
    const res = yield post(['auth/login'], payload);
    setToken(res.data.access_token);
    yield put(
      setUser({
        ...res.data,
        factor_auth_guard: !!res.data?.twoFA_login,
      })
    );
    callback();
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* logoutApp() {
  removeToken();
  yield put(clearLetter());
  yield put(clearOwnerNodes());
  yield put(clearUser());
  yield put(clearNotifications());
  yield put(clearPermissions());
  yield put(clearPagePermissions());
  localStorage.removeItem('SEEN_POPUP_NOTIFICATIONS');
}

export function* registerEntity({ payload, callback, resetSubmitting }) {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      email: payload.email,
      entity_name: payload.entityName,
      entity_register_country: payload.entityRegisterCountry,
      entity_register_number: payload.entityRegisterNumber,
      entity_tax: payload.entityTax,
      entity_type: payload.entityType,
      first_name: payload.firstName,
      last_name: payload.lastName,
      password: payload.password,
      pseudonym: payload.pseudonym,
      telegram: payload.telegram,
      validatorAddress: payload.validatorAddress || '',
    });
    const res = yield post(['auth/register-entity'], params, { headers });
    setToken(res.data.access_token);
    localStorage.setItem('USER_ID', res.data.user_id);
    yield put(setUser(res.data));
    callback(res.data);
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* registerIndividual({ payload, callback, resetSubmitting }) {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      password: payload.password,
      pseudonym: payload.pseudonym,
      telegram: payload.telegram,
      validatorAddress: payload.validatorAddress || '',
    });
    const res = yield post(['auth/register-individual'], params, { headers });
    setToken(res.data.access_token);
    yield put(setUser(res.data));
    callback(res.data);
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* resetPassword({ payload, callback, resetSubmitting }) {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    yield post(['auth/send-reset-password'], qs.stringify(payload), {
      headers,
    });
    callback();
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* updateEmail({ payload, callback, resetSubmitting }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      email: payload.email,
    });
    yield post(['users/change-email'], params, { headers });
    callback();
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* updateNewPassword({ payload, callback, resetSubmitting }) {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      code: payload.code,
      email: payload.email,
      password: payload.password,
    });
    yield post(['auth/reset-password'], params, { headers });
    callback();
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* verifyEmail({ payload, callback, resetSubmitting }) {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/verify-email'], payload, { headers });
    yield put(
      updateUser({
        period: 'onboarding',
      })
    );
    callback();
    resetSubmitting();
  } catch (error) {
    yield put(saveApiResponseError(error));
    resetSubmitting();
  }
}

export function* resendVerificationCode({ resolve, reject }) {
  try {
    yield post(['users/resend-verify-email'], null);
    resolve();
  } catch (error) {
    yield put(saveApiResponseError(error));
    reject();
  }
}

export function* fetchUserInfo({ resolve }) {
  try {
    const res = yield get(['users/profile']);
    yield put(setUser(res.data));
    const permissions = res.data?.permissions.reduce(
      (sum, x) => ({
        ...sum,
        [x.name]: x.is_permission,
      }),
      {}
    );
    const pagePermissions = res.data?.page_permissions.reduce(
      (sum, x) => ({
        ...sum,
        [x.name]: x.is_permission,
      }),
      {}
    );
    yield put(setPermissions(permissions));
    yield put(setPagePermissions(pagePermissions));
    resolve();
    yield put(fetchUserInfoSuccess(res.data));
  } catch (error) {
    yield put(fetchUserInfoError(error));
  }
}

export function* changeEmailConfirm({ payload, resolve, reject }) {
  try {
    const res = yield post(['users/confirm-change-email'], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* changeEmailCancel({ payload, resolve, reject }) {
  try {
    const res = yield post(['users/cancel-change-email'], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* verify2FA({ payload, resolve, reject }) {
  try {
    const res = yield post(['users/check-login-2fa'], payload);
    yield put(
      updateUser({
        period: 'final',
      })
    );
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* resend2FACode({ resolve, reject }) {
  try {
    const res = yield post(['users/resend-2fa']);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getBannerNotifications() {
  try {
    const query = qs.stringify({
      type: 'banner',
    });
    const res = yield get([`users/notification?${query}`]);
    yield put(setNotifications({ banner: res.data }));
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getPopupNotifications() {
  try {
    const query = qs.stringify({
      type: 'popup',
    });
    const res = yield get([`users/notification?${query}`]);
    yield put(setNotifications({ popup: res.data }));
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* getNodesFromUser({ resolve, reject }) {
  try {
    const res = yield get([`users/list-node`]);
    yield delay(500);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* checkSessionId({ payload, resolve, reject }) {
  try {
    const query = qs.stringify(payload);
    const res = yield get([`donation?${query}`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* getUserDashboard({ resolve, reject }) {
  try {
    const res = yield get([`users/dashboard`]);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* donate({ payload, resolve, reject }) {
  try {
    const res = yield post([`donation`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* contactUsFromGuest({ payload, resolve, reject }) {
  try {
    const res = yield post([`contact-us`], payload);
    resolve(res.data);
  } catch (error) {
    reject(error);
    yield put(saveApiResponseError(error));
  }
}

export function* watchAuth() {
  yield all([takeLatest('LOGIN_APP', loginApp)]);
  yield all([takeLatest('LOGOUT_APP', logoutApp)]);
  yield all([takeLatest('REGISTER_ENTITY', registerEntity)]);
  yield all([takeLatest('REGISTER_INDIVIDUAL', registerIndividual)]);
  yield all([takeLatest('RESET_PASSWORD', resetPassword)]);
  yield all([takeLatest('UPDATE_EMAIL', updateEmail)]);
  yield all([takeLatest('UPDATE_PASSWORD', updateNewPassword)]);
  yield all([takeLatest('VERIFY_EMAIL', verifyEmail)]);
  yield all([takeLatest('RESEND_VERIFICATION_CODE', resendVerificationCode)]);
  yield all([takeLatest('RESEND_2FA_CODE', resend2FACode)]);
  yield all([takeLatest('GET_BANNER_NOTIFICATIONS', getBannerNotifications)]);
  yield all([takeLatest('GET_POPUP_NOTIFICATIONS', getPopupNotifications)]);
  yield all([takeLatest('FETCH_USER_INFO', fetchUserInfo)]);
  yield all([takeLatest('CHANGE_EMAIL_CONFIRM', changeEmailConfirm)]);
  yield all([takeLatest('CHANGE_EMAIL_CANCEL', changeEmailCancel)]);
  yield all([takeLatest('VERIFY_2FA', verify2FA)]);
  yield all([takeLatest('GET_NODES_FROM_USER', getNodesFromUser)]);
  yield all([takeLatest('GET_USER_DASHBOARD', getUserDashboard)]);
  yield all([takeLatest('CHECK_SESSION_ID', checkSessionId)]);
  yield all([takeLatest('DONATE', donate)]);
  yield all([takeLatest('CONTACT_US_FROM_GUEST', contactUsFromGuest)]);
}
