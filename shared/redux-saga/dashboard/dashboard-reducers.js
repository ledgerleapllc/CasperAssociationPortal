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
