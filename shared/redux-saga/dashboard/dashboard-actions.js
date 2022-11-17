export const getVotes = (payload, successCb) => ({
  type: 'GET_VOTES',
  payload,
  successCb,
});

export const getMyVotes = (payload, successCb) => ({
  type: 'GET_MY_VOTES',
  payload,
  successCb,
});

export const requestReactivation = (payload, resolve, reject) => ({
  type: 'REQUEST_REACTIVATION',
  payload,
  resolve,
  reject,
});

export const canRequestReactivation = (resolve, reject) => ({
  type: 'CAN_REQUEST_REACTIVATION',
  resolve,
  reject,
});

export const getVoteStatus = (resolve, reject) => ({
  type: 'GET_VOTE_STATUS',
  resolve,
  reject,
});

export const getVoteDetail = (payload, resolve, reject) => ({
  type: 'GET_VOTE_DETAIL',
  payload,
  resolve,
  reject,
});

export const publishDiscussion = (payload, resolve, reject) => ({
  type: 'PUBLISH_DISCUSSION',
  payload,
  resolve,
  reject,
});

export const recordVote = (payload, resolve, reject) => ({
  type: 'RECORD_VOTE',
  payload,
  resolve,
  reject,
});

export const getDiscussions = (payload, successCb) => ({
  type: 'GET_DISCUSSIONS',
  payload,
  successCb,
});

export const getPinnedDiscussions = (payload, resolve, reject) => ({
  type: 'GET_PINNED_DISCUSSIONS',
  payload,
  resolve,
  reject,
});

export const getDraftDiscussions = (payload, resolve, reject) => ({
  type: 'GET_DRAFT_DISCUSSIONS',
  payload,
  resolve,
  reject,
});

export const deleteDiscussion = (payload, resolve, reject) => ({
  type: 'DELETE_DISCUSSION',
  payload,
  resolve,
  reject,
});

export const deleteDraftDiscussion = (payload, resolve, reject) => ({
  type: 'DELETE_DRAFT_DISCUSSION',
  payload,
  resolve,
  reject,
});

export const getMyERAs = (resolve, reject) => ({
  type: 'GET_MY_ERAS',
  resolve,
  reject,
});

export const getMyDiscussions = (payload, resolve, reject) => ({
  type: 'GET_MY_DISCUSSIONS',
  payload,
  resolve,
  reject,
});

export const getTrendingDiscussions = resolve => ({
  type: 'GET_TRENDING_DISCUSSIONS',
  resolve,
});

export const getDiscussionDetail = (id, resolve, reject) => ({
  type: 'GET_DISCUSSION_DETAIL',
  id,
  resolve,
  reject,
});

export const getDiscussionComments = (payload, resolve) => ({
  type: 'GET_DISCUSSION_COMMENTS',
  payload,
  resolve,
});

export const setDiscussionPin = id => ({
  type: 'SET_DISCUSSION_PIN',
  id,
});

export const createDiscussion = (payload, resolve, reject) => ({
  type: 'CREATE_DISCUSSION',
  payload,
  resolve,
  reject,
});

export const updateDiscussion = (payload, resolve, reject) => ({
  type: 'UPDATE_DISCUSSION',
  payload,
  resolve,
  reject,
});

export const setRemoveNewMark = id => ({
  type: 'SET_REMOVE_NEW',
  id,
});

export const deleteDiscussionComment = (payload, resolve, reject) => ({
  type: 'DELETE_DISCUSSION_COMMENT',
  payload,
  resolve,
  reject,
});

export const postDiscussionComment = (payload, resolve, reject) => ({
  type: 'POST_DISCUSSION_COMMENT',
  payload,
  resolve,
  reject,
});

export const voteDiscussion = (payload, successCb) => ({
  type: 'VOTE_DISCUSSION',
  payload,
  successCb,
});

export const submitNode = (payload, resolve, reject) => ({
  type: 'SUBMIT_NODE',
  payload,
  resolve,
  reject,
});

export const submitDetail = (payload, resolve, reject) => ({
  type: 'SUBMIT_DETAIL',
  payload,
  resolve,
  reject,
});

export const uploadVerificationDocs = (payload, resolve, reject) => ({
  type: 'UPDATE_VERIFICATION_DOCUMENTS',
  payload,
  resolve,
  reject,
});

export const getUserFullDashboard = (resolve, reject) => ({
  type: 'GET_USER_FULL_DASHBOARD',
  resolve,
  reject,
});

export const getAdminNodesInfo = (resolve, reject) => ({
  type: 'GET_ADMIN_NODES_INFO',
  resolve,
  reject,
});

export const getUserNodesInfo = (resolve, reject) => ({
  type: 'GET_USER_NODES_INFO',
  resolve,
  reject,
});

export const getUserMembershipInfo = (resolve, reject) => ({
  type: 'GET_USER_MEMBERSHIP_INFO',
  resolve,
  reject,
});

export const uploadAvatar = (payload, resolve, reject) => ({
  type: 'UPLOAD_AVATAR',
  payload,
  resolve,
  reject,
});

export const checkPassword = (payload, resolve, reject) => ({
  type: 'CHECK_PASSWORD',
  payload,
  resolve,
  reject,
});

export const updateUserSettings = (payload, resolve, reject) => ({
  type: 'UPDATE_USER_SETTINGS',
  payload,
  resolve,
  reject,
});

export const dismissNotification = (payload, resolve) => ({
  type: 'DISMISS_NOTIFICATION',
  payload,
  resolve,
});

export const updateViewNotification = (payload, resolve) => ({
  type: 'UPDATE_VIEW_NOTIFICATION',
  payload,
  resolve,
});

export const updateClickCTANotification = (payload, resolve) => ({
  type: 'UPDATE_CLICK_CTA',
  payload,
  resolve,
});

export const getLockPageConditions = (resolve, reject) => ({
  type: 'GET_LOCK_PAGE_CONDITIONS',
  resolve,
  reject,
});

export const getPriceTokenGraphInfo = (resolve, reject) => ({
  type: 'GET_PRICE_TOKEN_GRAPH_INFO',
  resolve,
  reject,
});

export const viewedAttachDocument = (payload, resolve) => ({
  type: 'VIEWED_ATTACH_DOCUMENT',
  payload,
  resolve,
});

export const submitContactMessage = (payload, resolve, reject) => ({
  type: 'SUBMIT_CONTACT_MESSAGE',
  payload,
  resolve,
  reject,
});
