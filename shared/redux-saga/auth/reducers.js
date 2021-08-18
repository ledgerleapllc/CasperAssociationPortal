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

const setMetrics = (state, payload) => payload;

const clearMetrics = () => ({});

const metricsStrategies = {
  SET_METRICS: setMetrics,
  CLEAR_METRICS: clearMetrics,
  __default__: state => state,
};

const metrics = createReducer(metricsStrategies, {});

// my notifications
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

const setMetricConfig = (state, payload) => ({
  ...state,
  max: {
    ...state.max,
    ...payload.max,
  },
});

const metricConfigStrategies = {
  SET_METRIC_CONFIG: setMetricConfig,
  __default__: state => state,
};

const metricConfig = createReducer(metricConfigStrategies, {
  max: {
    block_height_average: 0,
    peers: 0,
    update_responsiveness: 0,
  },
});

export const authReducer = combineReducers({
  fetchUserInfo,
  userInfo,
  metrics,
  notifications,
  metricConfig,
});
