export const helloSignRequest = callback => ({
  type: 'HELLO_SIGN_REQUEST',
  callback,
});

export const bypassHelloSignRequest = callback => ({
  type: 'BYPASS_HELLO_SIGN_REQUEST',
  callback,
});

export const bypassOnboardStep = (payload, callback) => ({
  type: 'BYPASS_ONBOARD_STEP',
  payload,
  callback,
});

export const submitKYC = (payload, resolve) => ({
  type: 'SUBMIT_KYC',
  payload,
  resolve,
});

export const saveShuftiproTemp = payload => ({
  type: 'SAVE_SHUFTI',
  payload,
});

export const updateShuftiproTemp = (payload, resolve) => ({
  type: 'UPDATE_SHUFTI',
  payload,
  resolve,
});

export const submitPublicAddress = (payload, callback, isVerifying) => ({
  type: 'SUBMIT_PUBLIC_ADDRESS',
  callback,
  isVerifying,
  payload,
});

export const verifyFileCasperSigner = (payload, callback) => ({
  type: 'VERIFY_FILE_CASPER_SIGNER',
  callback,
  payload,
});

export const updateTypeOwnerNode = (payload, resolve) => ({
  type: 'UPDATE_TYPE_OWNER_NODE',
  payload,
  resolve,
});

export const postOwnerNodes = (payload, resolve) => ({
  type: 'POST_OWNER_NODES',
  payload,
  resolve,
});

export const handleViewGuide = () => ({
  type: 'HANDLE_VIEW_GUIDE',
});

export const uploadLetter = (payload, callback) => ({
  type: 'UPLOAD_LETTER',
  callback,
  payload,
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
