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

export const resendVerificationCode = (resolve, reject) => ({
  type: 'RESEND_VERIFICATION_CODE',
  resolve,
  reject,
});

export const fetchUserInfo = resolve => ({
  type: 'FETCH_USER_INFO',
  resolve,
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

export const changeEmailConfirm = (payload, resolve, reject) => ({
  type: 'CHANGE_EMAIL_CONFIRM',
  payload,
  resolve,
  reject,
});

export const changeEmailCancel = (payload, resolve, reject) => ({
  type: 'CHANGE_EMAIL_CANCEL',
  payload,
  resolve,
  reject,
});

export const verify2FA = (payload, resolve, reject) => ({
  type: 'VERIFY_2FA',
  payload,
  resolve,
  reject,
});

export const resend2FACode = (payload, resolve, reject) => ({
  type: 'RESEND_2FA_CODE',
  resolve,
  reject,
});

export const getMyMetrics = () => ({
  type: 'GET_MY_METRICS',
});

export const setMetrics = payload => ({
  type: 'SET_METRICS',
  payload,
});

export const clearMetrics = () => ({
  type: 'CLEAR_METRICS',
});

export const getBannerNotifications = () => ({
  type: 'GET_BANNER_NOTIFICATIONS',
});

export const getPopupNotifications = () => ({
  type: 'GET_POPUP_NOTIFICATIONS',
});

export const setNotifications = payload => ({
  type: 'SET_NOTIFICATIONS',
  payload,
});

export const clearNotifications = () => ({
  type: 'CLEAR_NOTIFICATIONS',
});

export const getNodesFromUser = (payload, resolve, reject) => ({
  type: 'GET_NODES_FROM_USER',
  payload,
  resolve,
  reject,
});

export const getUserDashboard = (resolve, reject) => ({
  type: 'GET_USER_DASHBOARD',
  resolve,
  reject,
});

export const setMetricConfig = payload => ({
  type: 'SET_METRIC_CONFIG',
  payload,
});

export const setPermissions = payload => ({
  type: 'SET_PERMISSIONS',
  payload,
});

export const setCollapsed = payload => ({
  type: 'SET_COLLAPSED',
  payload,
});

export const clearPermissions = payload => ({
  type: 'CLEAR_PERMISSIONS',
  payload,
});

export const donate = (payload, resolve, reject) => ({
  type: 'DONATE',
  payload,
  resolve,
  reject,
});

export const contactUsFromGuest = (payload, resolve, reject) => ({
  type: 'CONTACT_US_FROM_GUEST',
  payload,
  resolve,
  reject,
});
