import { createReducer } from '../../../helpers/reducer-factory';

const initialState = {
  data: null,
  error: null,
  hasError: false,
  isLoading: false,
  isProcessing: false,
};

const getDashboardDataDemo = state => ({
  ...state,
  isLoading: true,
});

const getDashboardDataDemoSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getDashboardDataDemoError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const strategiesList = {
  ['GET_DASHBOARD_DATA_DEMO']: getDashboardDataDemo,
  ['GET_DASHBOARD_DATA_DEMO_SUCCESS']: getDashboardDataDemoSuccess,
  ['GET_DASHBOARD_DATA_DEMO_ERROR']: getDashboardDataDemoError,
  __default__: state => state,
};

export const demoDataReducer = createReducer(strategiesList, initialState);

const getVotes = state => ({
  ...state,
  isLoading: true,
});

const getVotesSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getVotesError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const strategiesListVotes = {
  ['GET_VOTES']: getVotes,
  ['GET_VOTES_SUCCESS']: getVotesSuccess,
  ['GET_VOTES_ERROR']: getVotesError,
  __default__: state => state,
};

export const votesReducer = createReducer(strategiesListVotes, initialState);

const getVoteDetail = state => ({
  ...state,
  isLoading: true,
});

const getVoteDetailSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getVoteDetailError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const strategiesVoteDetail = {
  ['GET_VOTE_DETAIL']: getVoteDetail,
  ['GET_VOTE_DETAIL_SUCCESS']: getVoteDetailSuccess,
  ['GET_VOTE_DETAIL_ERROR']: getVoteDetailError,
  __default__: state => state,
};

export const voteDetailReducer = createReducer(
  strategiesVoteDetail,
  initialState
);

const recordVote = state => ({
  ...state,
  isLoading: true,
});

const recordVoteSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const recordVoteError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const strategiesRecordVote = {
  ['RECORD_VOTE']: recordVote,
  ['RECORD_VOTE_SUCCESS']: recordVoteSuccess,
  ['RECORD_VOTE_ERROR']: recordVoteError,
  __default__: state => state,
};

export const recordVoteReducer = createReducer(
  strategiesRecordVote,
  initialState
);
