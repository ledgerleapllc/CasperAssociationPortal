import { put, takeLatest, all } from 'redux-saga/effects';
import qs from 'qs';
import { post, get } from '../../core/saga-api';
import { saveApiResponseError } from '../api-controller/actions';
import {
  getToken,
  removeToken,
  setToken,
} from '../../../helpers/api/auth.service';
import {
  clearUser,
  fetchUserInfoError,
  fetchUserInfoSuccess,
  setUser,
  updateUser,
} from './actions';
import { clearLetter, clearOwnerNodes } from '../onboard/actions';

export function* loginApp({ payload, callback, resetSubmitting }) {
  try {
    const res = yield post(['auth/login'], payload);
    setToken(res.data.access_token);
    yield put(setUser(res.data));
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
    });
    const res = yield post(['auth/register-entity'], params, { headers });
    setToken(res.data.access_token);
    localStorage.setItem('USER_ID', res.data.user_id);
    callback();
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
    });
    const res = yield post(['auth/register-individual'], params, { headers });
    setToken(res.data.access_token);
    yield put(setUser(res.data));
    callback();
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

export function* resend2FaCode() {
  try {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield post(['users/resend-verify-email'], null, { headers });
  } catch (error) {
    yield put(saveApiResponseError(error));
  }
}

export function* fetchUserInfo() {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  try {
    const res = yield get(['users/profile'], { headers });
    yield put(setUser(res.data));
    yield put(fetchUserInfoSuccess(res.data));
  } catch (error) {
    yield put(fetchUserInfoError(error));
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
  yield all([takeLatest('RESEND_2FA_CODE', resend2FaCode)]);
  yield all([takeLatest('FETCH_USER_INFO', fetchUserInfo)]);
}
