export const getDashboardDataDemo = () => ({
  type: 'GET_DASHBOARD_DATA_DEMO',
});

export const getListCategorySupportSuccess = data => ({
  type: 'GET_DASHBOARD_DATA_DEMO_SUCCESS',
  payload: data,
});

export const getListCategorySupportError = error => ({
  type: 'GET_DASHBOARD_DATA_DEMO_SUCCESS_ERROR',
  payload: error,
});

export const getVotes = (payload, successCb) => ({
  type: 'GET_VOTES',
  payload,
  successCb,
});

export const getVoteDetail = (payload, callback) => ({
  type: 'GET_VOTE_DETAIL',
  payload,
  callback,
});

export const getVoteDetailSuccess = data => ({
  type: 'GET_VOTE_DETAIL_SUCCESS',
  payload: data,
});

export const getVoteDetailError = error => ({
  type: 'GET_VOTE_DETAIL_ERROR',
  payload: error,
});

export const recordVote = (payload, callback) => ({
  type: 'RECORD_VOTE',
  payload,
  callback,
});

export const recordVoteSuccess = data => ({
  type: 'RECORD_VOTE_SUCCESS',
  payload: data,
});

export const recordVoteError = error => ({
  type: 'RECORD_VOTE_ERROR',
  payload: error,
});

export const getDiscussions = (payload, successCb) => ({
  type: 'GET_DISCUSSIONS',
  payload,
  successCb,
});

export const getPinnedDiscussions = (successCb) => ({
  type: 'GET_PINNED_DISCUSSIONS',
  successCb,
});

export const getMyDiscussions = (successCb) => ({
  type: 'GET_MY_DISCUSSIONS',
  successCb,
});

export const getTrendingDiscussions = (successCb) => ({
  type: 'GET_TRENDING_DISCUSSIONS',
  successCb,
});


export const getDiscussionDetail = (id, successCb) => ({
  type: 'GET_DISCUSSION_DETAIL',
  id,
  successCb,
});

export const setDiscussionPin = (id, successCb) => ({
  type: 'SET_DISCUSSION_PIN',
  id,
  successCb,
});

export const createDiscussion = (payload, successCb, resetSubmitting) => ({
  type: 'CREATE_DISCUSSION',
  payload,
  successCb,
  resetSubmitting,
});

export const setRemoveNewMark = (id, successCb) => ({
  type: 'SET_REMOVE_NEW',
  id,
  successCb,
});

export const postDiscussionComment = (payload, successCb) => ({
  type: 'POST_DISCUSSION_COMMENT',
  payload,
  successCb,
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

export const getMyInfo = (resolve, reject) => ({
  type: 'GET_MY_INFO',
  resolve,
  reject,
});

export const uploadAvatar = (payload, resolve, reject) => ({
  type: 'UPLOAD_AVATAR',
  payload,
  resolve,
  reject,
});
