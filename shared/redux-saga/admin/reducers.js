import { createReducer } from '../../../helpers/reducer-factory';

const initialState = {
  data: null,
  error: null,
  hasError: false,
  isLoading: false,
  isProcessing: false,
};

const getListMembers = state => ({
  ...state,
  isLoading: true,
});

const getListMembersSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getListMembersError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const getUserDetail = state => ({
  ...state,
  isLoading: true,
});

const getUserDetailSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getUserDetailError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const strategiesListMembers = {
  ['GET_LIST_MEMBER']: getListMembers,
  ['GET_LIST_MEMBER_SUCCESS']: getListMembersSuccess,
  ['GET_LIST_MEMBER_ERROR']: getListMembersError,
  __default__: state => state,
};

const strategiesUserDetail = {
  ['GET_USER_DETAIL']: getUserDetail,
  ['GET_USER_DETAIL_SUCCESS']: getUserDetailSuccess,
  ['GET_USER_DETAIL_ERROR']: getUserDetailError,
  __default__: state => state,
};

export const membersReducer = createReducer(
  strategiesListMembers,
  initialState
);
export const userDetailReducer = createReducer(
  strategiesUserDetail,
  initialState
);
