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

export const getUserDetail = (payload, resolve, reject) => ({
  type: 'GET_USER_DETAIL',
  payload,
  resolve,
  reject,
});

export const updateBlockAccess = (payload, resolve, reject) => ({
  type: 'UPDATE_BLOCK_ACCESS',
  payload,
  resolve,
  reject,
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

export const denyKYC = data => ({
  type: 'DENY_KYC',
  payload: data,
});

export const getListIntake = (payload, successCb) => ({
  type: 'GET_LIST_INTAKE',
  payload,
  successCb,
});

export const getListVerifications = (payload, resolve) => ({
  type: 'GET_LIST_VERIFICATIONS',
  payload,
  resolve,
});

export const removeIntake = (payload, resolve) => ({
  type: 'REMOVE_INTAKE',
  payload,
  resolve,
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

export const updateBallot = (payload, resolve, reject) => ({
  type: 'UPDATE_BALLOT',
  payload,
  resolve,
  reject,
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

export const deletePerk = (payload, resolve, reject) => ({
  type: 'DELETE_PERK',
  payload,
  resolve,
  reject,
});

export const bypassKYC = (userId, resolve, reject) => ({
  type: 'BYPASS_KYC',
  userId,
  resolve,
  reject,
});

export const submitPerk = (payload, resolve, reject) => ({
  type: 'SUBMIT_PERK',
  payload,
  resolve,
  reject,
});

export const editPerk = (payload, resolve, reject) => ({
  type: 'EDIT_PERK',
  payload,
  resolve,
  reject,
});

export const cancelBallot = (payload, resolve, reject) => ({
  type: 'CANCEL_BALLOT',
  payload,
  resolve,
  reject,
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

export const registerSubAdmin = (payload, resolve, reject) => ({
  type: 'REGISTER_SUB_ADMIN',
  payload,
  resolve,
  reject,
});

export const getIPHistories = (payload, callback) => ({
  type: 'GET_IP_HISTORIES',
  payload,
  callback,
});

export const getLogUsersViewdDoc = (payload, callback) => ({
  type: 'GET_LOG_USERS_VIEWED_DOC',
  payload,
  callback,
});

export const inviteSubadmin = (email, resolve, reject) => ({
  type: 'INVITE_SUBADMIN',
  email,
  resolve,
  reject,
});

export const revokeSubadmin = (id, resolve, reject) => ({
  type: 'REVOKE_SUBADMIN',
  id,
  resolve,
  reject,
});

export const undoRevokeSubadmin = (id, resolve, reject) => ({
  type: 'UNDO_REVOKE_SUBADMIN',
  id,
  resolve,
  reject,
});

export const resetSubadminPassword = (id, resolve, reject) => ({
  type: 'RESET_SUBADMIN_PASSWORD',
  id,
  resolve,
  reject,
});

export const resendInviteLink = (id, resolve, reject) => ({
  type: 'RESEND_INVITE_SUBADMIN',
  id,
  resolve,
  reject,
});

export const changeSubadminPermissions = (id, payload, callback) => ({
  type: 'CHANGE_SUBADMIN_PERMISSIONS',
  id,
  payload,
  callback,
});

export const approveUser = (payload, resolve, reject) => ({
  type: 'APPROVE_USER',
  payload,
  resolve,
  reject,
});

export const resetUser = (payload, resolve, reject) => ({
  type: 'RESET_USER',
  payload,
  resolve,
  reject,
});

export const banUser = (payload, resolve, reject) => ({
  type: 'BAN_USER',
  payload,
  resolve,
  reject,
});

export const banVerifiedUser = (payload, resolve, reject) => ({
  type: 'BAN_VERIFIED_USER',
  payload,
  resolve,
  reject,
});

export const approveDocuments = (payload, resolve, reject) => ({
  type: 'APPROVED_DOCUMENTS',
  payload,
  resolve,
  reject,
});

export const refreshLinks = (payload, resolve, reject) => ({
  type: 'REFRESH_LINKS',
  payload,
  resolve,
  reject,
});

export const getVerificationDetail = (payload, resolve, reject) => ({
  type: 'GET_LIST_VERIFICATION_DETAIL',
  payload,
  resolve,
  reject,
});

export const resetUserKYC = (payload, resolve, reject) => ({
  type: 'RESET_USER_KYC',
  payload,
  resolve,
  reject,
});

export const activateVerifiedStatus = (payload, resolve, reject) => ({
  type: 'ACTIVATE_VERIFIED_STATUS',
  payload,
  resolve,
  reject,
});

export const getEmailerData = (resolve, reject) => ({
  type: 'GET_EMAILER_DATA',
  resolve,
  reject,
});

export const addEmailerAdmin = (payload, resolve, reject) => ({
  type: 'ADD_EMAILER_ADMIN',
  payload,
  resolve,
  reject,
});

export const deleteEmailerAdmin = (payload, resolve, reject) => ({
  type: 'DELETE_EMAILER_ADMIN',
  payload,
  resolve,
  reject,
});

export const updateEmailerTriggerUser = (payload, resolve, reject) => ({
  type: 'UPDATE_EMAILER_TRIGGER_USER',
  payload,
  resolve,
  reject,
});

export const updateEmailerTriggerAdmin = (payload, resolve, reject) => ({
  type: 'UPDATE_EMAILER_TRIGGER_ADMIN',
  payload,
  resolve,
  reject,
});

export const getAdminERAsByUser = (userId, resolve, reject) => ({
  type: 'GEt_ADMIN_ERAS_BY_USER',
  userId,
  resolve,
  reject,
});

export const getAllAdminERAs = (resolve, reject) => ({
  type: 'GET_ALL_ADMIN_ERAS',
  resolve,
  reject,
});

export const getListPerks = (payload, resolve, reject) => ({
  type: 'GET_LIST_PERKS',
  payload,
  resolve,
  reject,
});

export const getActivePerks = (payload, resolve, reject) => ({
  type: 'GET_ACTIVE_PERKS',
  payload,
  resolve,
  reject,
});

export const getPerkEngagements = (payload, resolve, reject) => ({
  type: 'GET_LIST_PERK_ENGAGEMENT',
  payload,
  resolve,
  reject,
});

export const getPerkDetail = (payload, resolve, reject) => ({
  type: 'GET_PERK_DETAIL',
  payload,
  resolve,
  reject,
});

export const getActivePerkDetail = (payload, resolve, reject) => ({
  type: 'GET_ACTIVE_PERK_DETAIL',
  payload,
  resolve,
  reject,
});

export const updateGlobalSettings = (payload, resolve, reject) => ({
  type: 'UPDATE_GLOBAL_SETTINGS',
  payload,
  resolve,
  reject,
});

export const addNotification = (payload, resolve, reject) => ({
  type: 'ADD_NOTIFICATION',
  payload,
  resolve,
  reject,
});

export const editNotification = (payload, resolve, reject) => ({
  type: 'EDIT_NOTIFICATION',
  payload,
  resolve,
  reject,
});

export const getNotificationDetail = (payload, resolve, reject) => ({
  type: 'GET_NOTIFICATION_DETAIL',
  payload,
  resolve,
  reject,
});

export const getListNotifications = (payload, resolve, reject) => ({
  type: 'GET_LIST_NOTIFICATIONS',
  payload,
  resolve,
  reject,
});

export const getNotificationViewLogs = (payload, resolve) => ({
  type: 'GET_NOTIFICATION_VIEW_LOGS',
  payload,
  resolve,
});

export const getHighPriorityNotification = (resolve, reject) => ({
  type: 'GET_HIGH_PRIORITY_NOTIFICATION',
  resolve,
  reject,
});

export const getAdminDashboard = (payload, resolve, reject) => ({
  type: 'GET_ADMIN_DASHBOARD',
  payload,
  resolve,
  reject,
});

export const getNodesByUser = (payload, resolve, reject) => ({
  type: 'GET_NODES_BY_USER',
  payload,
  resolve,
  reject,
});

export const getNodesFromAdmin = (payload, resolve, reject) => ({
  type: 'GET_NODES_FROM_ADMIN',
  payload,
  resolve,
  reject,
});

export const getGlobalSettings = (resolve, reject) => ({
  type: 'GET_GLOBAL_SETTINGS',
  resolve,
  reject,
});

export const getLockPageRules = (resolve, reject) => ({
  type: 'GET_LOCK_PAGE_RULES',
  resolve,
  reject,
});

export const updateLockPageRules = (payload, resolve, reject) => ({
  type: 'UPDATE_LOCK_PAGE_RULES',
  payload,
  resolve,
  reject,
});

export const addRecipient = (payload, resolve, reject) => ({
  type: 'ADD_RECIPIENT',
  payload,
  resolve,
  reject,
});

export const removeRecipient = (payload, resolve, reject) => ({
  type: 'REMOVE_RECIPIENT',
  payload,
  resolve,
  reject,
});

export const listRecipients = (payload, resolve, reject) => ({
  type: 'LIST_RECIPIENTS',
  payload,
  resolve,
  reject,
});

export const getMembershipFile = (payload, resolve, reject) => ({
  type: 'GET_MEMBERSHIP_FILE',
  payload,
  resolve,
  reject,
});

export const changeMembershipFile = (payload, resolve, reject) => ({
  type: 'CHANGE_MEMBERSHIP_FILE',
  payload,
  resolve,
  reject,
});
