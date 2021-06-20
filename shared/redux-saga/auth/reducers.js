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
};

const setUser = (state, payload) => {
  let period;
  if (!payload.email_verified_at) {
    period = 'verifying';
  } else if (
    !payload.signature_request_id ||
    !payload.node_verified_at ||
    !payload.kyc_verified_at
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

export const authReducer = combineReducers({
  fetchUserInfo,
  userInfo,
});
