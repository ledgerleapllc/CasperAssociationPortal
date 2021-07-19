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

export const getVoteDetail = (payload, resolve, reject) => ({
  type: 'GET_VOTE_DETAIL',
  payload,
  resolve,
  reject,
});

export const getVoteDetailSuccess = data => ({
  type: 'GET_VOTE_DETAIL_SUCCESS',
  payload: data,
});

export const getVoteDetailError = error => ({
  type: 'GET_VOTE_DETAIL_ERROR',
  payload: error,
});

export const recordVote = (payload, resolve, reject) => ({
  type: 'RECORD_VOTE',
  payload,
  resolve,
  reject,
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

export const getPinnedDiscussions = (payload, resolve, reject) => ({
  type: 'GET_PINNED_DISCUSSIONS',
  payload,
  resolve,
  reject,
});

export const getMyDiscussions = (payload, resolve, reject) => ({
  type: 'GET_MY_DISCUSSIONS',
  payload,
  resolve,
  reject,
});

export const getTrendingDiscussions = (payload, resolve) => ({
  type: 'GET_TRENDING_DISCUSSIONS',
  payload,
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

export const setRemoveNewMark = id => ({
  type: 'SET_REMOVE_NEW',
  id,
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
