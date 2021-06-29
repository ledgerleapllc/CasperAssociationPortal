export const getListMembers = payload => ({
  type: 'GET_LIST_MEMBER',
  payload,
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

export const getListIntake = payload => ({
  type: 'GET_LIST_INTAKE',
  payload,
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

export const submitBallot = (payload, callback) => ({
  type: 'SUBMIT_BALLOT',
  payload,
  callback,
});
