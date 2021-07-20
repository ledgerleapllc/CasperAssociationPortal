export const getListMembers = (payload, callback) => ({
  type: 'GET_LIST_MEMBER',
  payload,
  callback,
});

export const getListMembersSuccess = data => ({
  type: 'GET_LIST_MEMBER_SUCCESS',
  payload: data,
});

export const getListMembersError = error => ({
  type: 'GET_LIST_MEMBER_ERROR',
  payload: error,
});

export const getUserDetail = data => ({
  type: 'GET_USER_DETAIL',
  payload: data,
});

export const getUserDetailSuccess = data => ({
  type: 'GET_USER_DETAIL_SUCCESS',
  payload: data,
});

export const getUserDetailError = error => ({
  type: 'GET_USER_DETAIL_ERROR',
  payload: error,
});

export const getUserKYCInfo = data => ({
  type: 'GET_USER_KYC_INFO',
  payload: data,
});

export const getUserKYCInfoSuccess = data => ({
  type: 'GET_USER_KYC_INFO_SUCCESS',
  payload: data,
});

export const getUserKYCInfoError = error => ({
  type: 'GET_USER_KYC_INFO_ERROR',
  payload: error,
});

export const approveKYC = data => ({
  type: 'APPROVE_KYC',
  payload: data,
});

export const denyKYC = data => ({
  type: 'DENY_KYC',
  payload: data,
});

export const getListIntake = (payload, successCb) => ({
  type: 'GET_LIST_INTAKE',
  payload,
  successCb
});

export const getListIntakeSuccess = data => ({
  type: 'GET_LIST_INTAKE_SUCCESS',
  payload: data,
});

export const getListIntakeError = error => ({
  type: 'GET_LIST_INTAKE_ERROR',
  payload: error,
});

export const getBallots = (payload, callback) => ({
  type: 'GET_BALLOTS',
  payload,
  callback,
});

export const getBallotDetail = (payload, callback) => ({
  type: 'GET_BALLOT_DETAIL',
  payload,
  callback,
});

export const getBallotVotes = (payload, callback) => ({
  type: 'GET_BALLOT_VOTES',
  payload,
  callback,
});

export const submitBallot = (payload, resolve, reject) => ({
  type: 'SUBMIT_BALLOT',
  payload,
  resolve,
  reject,
});

export const cancelBallot = (payload, callback) => ({
  type: 'CANCEL_BALLOT',
  payload,
  callback,
});

export const cancelBallotSuccess = data => ({
  type: 'CANCEL_BALLOT_SUCCESS',
  payload: data,
});

export const cancelBallotError = error => ({
  type: 'CANCEL_BALLOT_ERROR',
  payload: error,
});

export const getSubadmins = (payload, callback) => ({
  type: 'GET_SUBADMINS',
  payload,
  callback,
});

export const inviteSubadmin = (email, callback) => ({
  type: 'INVITE_SUBADMIN',
  email,
  callback,
});

export const revokeSubadmin = (id, callback) => ({
  type: 'REVOKE_SUBADMIN',
  id,
  callback,
});

export const resetSubadminPassword = (id, callback) => ({
  type: 'RESET_SUBADMIN_PASSWORD',
  id,
  callback,
});

export const resendInviteLink = (id, callback) => ({
  type: 'RESEND_INVITE_SUBADMIN',
  id,
  callback,
});

export const changeSubadminPermissions = (id, payload, callback) => ({
  type: 'CHANGE_SUBADMIN_PERMISSIONS',
  id,
  payload,
  callback,
});

