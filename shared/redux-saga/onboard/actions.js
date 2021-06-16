export const helloSignRequest = callback => ({
  type: 'HELLO_SIGN_REQUEST',
  callback,
});

export const submitPublicAddress = (payload, callback) => ({
  type: 'SUBMIT_PUBLIC_ADDRESS',
  callback,
  payload,
});

export const verifyFileCasperSigner = (payload, callback) => ({
  type: 'VERIFY_FILE_CASPER_SIGNER',
  callback,
  payload,
});
