export const loginApp = (payload, callback, resetSubmitting) => ({
  type: 'LOGIN_APP',
  callback,
  payload,
  resetSubmitting,
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
