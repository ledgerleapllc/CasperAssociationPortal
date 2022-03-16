export const helloSignRequest = (resolve, reject) => ({
  type: 'HELLO_SIGN_REQUEST',
  resolve,
  reject,
});

export const submitKYC = (payload, resolve, reject) => ({
  type: 'SUBMIT_KYC',
  payload,
  resolve,
  reject,
});

export const saveShuftiproTemp = payload => ({
  type: 'SAVE_SHUFTI',
  payload,
});

export const updateShuftiproTemp = (payload, resolve, reject) => ({
  type: 'UPDATE_SHUFTI',
  payload,
  resolve,
  reject,
});

export const deleteShuftiproTemp = (payload, resolve, reject) => ({
  type: 'DELETE_SHUFTI',
  payload,
  resolve,
  reject,
});

export const submitPublicAddress = (payload, callback, isVerifying) => ({
  type: 'SUBMIT_PUBLIC_ADDRESS',
  callback,
  isVerifying,
  payload,
});

export const verifyFileCasperSigner = (payload, resolve, reject) => ({
  type: 'VERIFY_FILE_CASPER_SIGNER',
  payload,
  resolve,
  reject,
});

export const downloadMessageContent = (resolve, reject) => ({
  type: 'DOWNLOAD_MESSAGE_CONTENT',
  resolve,
  reject,
});

export const uploadLetter = (payload, resolve, reject) => ({
  type: 'UPLOAD_LETTER',
  payload,
  resolve,
  reject,
});

export const uploadLetterSuccess = payload => ({
  type: 'UPLOAD_LETTER_SUCCESS',
  payload,
});

export const uploadLetterError = payload => ({
  type: 'UPLOAD_LETTER_ERROR',
  payload,
});

export const getOwnerNodes = () => ({
  type: 'GET_OWNER_NODES',
});

export const getOwnerNodesSuccess = payload => ({
  type: 'GET_OWNER_NODES_SUCCESS',
  payload,
});

export const getOwnerNodesError = payload => ({
  type: 'GET_OWNER_NODES_ERROR',
  payload,
});

export const resendEmailOwnerNodes = payload => ({
  type: 'RESEND_EMAIL_OWNER_NODES',
  payload,
});

export const clearOwnerNodes = () => ({
  type: 'CLEAR_OWNER_NODES',
});

export const clearLetter = () => ({
  type: 'CLEAR_LETTER',
});

export const getMembershipFileForUser = (payload, resolve, reject) => ({
  type: 'GET_MEMBERSHIP_FILE_FOR_USER',
  payload,
  resolve,
  reject,
});

export const membershipAgreementForUser = (payload, resolve, reject) => ({
  type: 'MEMBERSHIP_AGREEMENT_FOR_USER',
  payload,
  resolve,
  reject,
});
