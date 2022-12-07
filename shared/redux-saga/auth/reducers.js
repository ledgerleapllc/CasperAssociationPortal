import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reducer-factory';
import {
  initialState,
  callingApi,
  handleApiSuccess,
  handleApiError,
} from '../../core/api.config';

const userInitialState = {
  id: null,
  fullInfo: null,
  period: null,
  type: null,
  isLoggedIn: false,
  signature_request_id: null,
  node_verified_at: null,
  kyc_verified_at: null,
};

const setUser = (state, payload) => {
  let period;
  if (!payload.email_verified_at || payload.factor_auth_guard) {
    period = 'verifying';
  } else if (
    !payload.signature_request_id ||
    !payload.node_verified_at ||
    !payload.letter_verified_at
  ) {
    period = 'onboarding';
  } else {
    period = 'final';
  }
  return {
    ...state,
    id: payload.id,
    fullInfo: payload,
    period,
    role: payload.role,
    isLoggedIn: true,
    signature_request_id: payload.signature_request_id,
    node_verified_at: payload.node_verified_at,
    kyc_verified_at: payload.kyc_verified_at,
    type: payload?.profile?.type || payload?.type,
    letter_file: payload?.letter_file,
    letter_verified_at: payload?.letter_verified_at,
    letter_rejected_at: payload?.letter_rejected_at,
    status: payload?.profile?.status || null,
  };
};

const updateUser = (state, payload) => ({ ...state, ...payload });

const clearUser = state => ({ ...state, ...userInitialState });

const userStrategies = {
  SET_USER_INFO: setUser,
  UPDATE_USER_INFO: updateUser,
  CLEAR_USER_INFO: clearUser,
  __default__: state => state,
};

export const userInfo = createReducer(userStrategies, userInitialState);

const fetchUserInfoStrategies = {
  FETCH_USER_INFO: callingApi,
  FETCH_USER_INFO_SUCCESS: handleApiSuccess,
  FETCH_USER_INFO_ERROR: handleApiError,
  __default__: state => state,
};

const fetchUserInfo = createReducer(fetchUserInfoStrategies, {
  ...initialState,
});

const setNotifications = (state, payload) => ({
  ...state,
  ...payload,
});

const clearNotifications = () => ({
  banner: null,
  popup: null,
});

const notificationsStrategies = {
  SET_NOTIFICATIONS: setNotifications,
  CLEAR_NOTIFICATIONS: clearNotifications,
  __default__: state => state,
};

const notifications = createReducer(notificationsStrategies, {
  banner: null,
  popup: null,
});

const setPermissions = (state, payload) => ({
  ...state,
  ...payload,
});
const clearPermissions = () => ({});

const permissionsStrategies = {
  SET_PERMISSIONS: setPermissions,
  CLEAR_PERMISSIONS: clearPermissions,
  __default__: state => state,
};

const setPagePermissions = (state, payload) => ({
  ...state,
  ...payload,
});
const clearPagePermissions = () => ({});

const pagePermissionsStrategies = {
  SET_PAGE_PERMISSIONS: setPagePermissions,
  CLEAR_PAGE_PERMISSIONS: clearPagePermissions,
  __default__: state => state,
};

const permissions = createReducer(permissionsStrategies, {});
const pagePermissions = createReducer(pagePermissionsStrategies, {});

const setCollapsed = (state, payload) => ({
  ...state,
  isCollapsed: payload.isCollapsed,
});

const setAuthUserNode = (state, payload) => ({
  ...state,
  authUserNode: payload.authUserNode,
});

const setGuideStep = (state, payload) => ({
  ...state,
  guideStep: payload.guideStep,
});

const setHideGuide = (state, payload) => ({
  ...state,
  hideGuide: payload.hideGuide,
});

const appInfoStrategies = {
  SET_COLLAPSED: setCollapsed,
  SET_AUTH_USER_NODE: setAuthUserNode,
  SET_GUIDE_STEP: setGuideStep,
  SET_HIDE_GUIDE: setHideGuide,
  __default__: state => state,
};

const appInfo = createReducer(appInfoStrategies, {
  isCollapsed: false,
  authUserNode: null,
  guideStep: null,
  hideGuide: false,
});

export const authReducer = combineReducers({
  fetchUserInfo,
  userInfo,
  permissions,
  pagePermissions,
  notifications,
  appInfo,
});
