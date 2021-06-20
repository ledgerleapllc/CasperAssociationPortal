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

const strategiesList = {
  ['GET_LIST_MEMBER']: getListMembers,
  ['GET_LIST_MEMBER_SUCCESS']: getListMembersSuccess,
  ['GET_LIST_MEMBER_ERROR']: getListMembersError,
  __default__: state => state,
};

export const membersReducer = createReducer(strategiesList, initialState);
