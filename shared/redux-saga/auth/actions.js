export const loginApp = (payload, callback, resetSubmitting) => ({
  type: 'LOGIN_APP',
  callback,
  payload,
  resetSubmitting,
});

export const logoutApp = () => ({
  type: 'LOGOUT_APP',
});

export const registerEntity = (payload, callback, resetSubmitting) => ({
  type: 'REGISTER_ENTITY',
  callback,
  payload,
  resetSubmitting,
});

export const registerIndividual = (payload, callback, resetSubmitting) => ({
  type: 'REGISTER_INDIVIDUAL',
  callback,
  payload,
  resetSubmitting,
});

export const resetPassword = (payload, callback, resetSubmitting) => ({
  type: 'RESET_PASSWORD',
  callback,
  payload,
  resetSubmitting,
});

export const updateEmail = (payload, callback, resetSubmitting) => ({
  type: 'UPDATE_EMAIL',
  callback,
  payload,
  resetSubmitting,
});

export const updatePassword = (payload, callback, resetSubmitting) => ({
  type: 'UPDATE_PASSWORD',
  callback,
  payload,
  resetSubmitting,
});

export const verifyEmail = (payload, callback, resetSubmitting) => ({
  type: 'VERIFY_EMAIL',
  callback,
  payload,
  resetSubmitting,
});

export const resend2FaCode = () => ({
  type: 'RESEND_2FA_CODE',
});

export const fetchUserInfo = () => ({
  type: 'FETCH_USER_INFO',
});

export const fetchUserInfoSuccess = payload => ({
  type: 'FETCH_USER_INFO_SUCCESS',
  payload,
});

export const fetchUserInfoError = payload => ({
  type: 'FETCH_USER_INFO_ERROR',
  payload,
});

export const setUser = payload => ({
  type: 'SET_USER_INFO',
  payload,
});

export const updateUser = payload => ({
  type: 'UPDATE_USER_INFO',
  payload,
});

export const clearUser = () => ({
  type: 'CLEAR_USER_INFO',
});
