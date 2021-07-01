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
