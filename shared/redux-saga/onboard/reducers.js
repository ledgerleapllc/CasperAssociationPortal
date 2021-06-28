import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reducer-factory';

const initialState = {
  data: null,
  error: null,
  hasError: false,
  isLoading: false,
};

const uploadLetter = state => ({
  ...state,
  isLoading: true,
});

const uploadLetterSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const uploadLetterError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const clearLetter = () => ({ ...initialState });

const uploadLetterStrategiesList = {
  UPLOAD_LETTER: uploadLetter,
  UPLOAD_LETTER_SUCCESS: uploadLetterSuccess,
  UPLOAD_LETTER_ERROR: uploadLetterError,
  CLEAR_OWNER_NODES: clearLetter,
  __default__: state => state,
};

export const uploadLetterReducer = createReducer(
  uploadLetterStrategiesList,
  initialState
);

const getOwnerNodes = state => ({
  ...state,
  isLoading: true,
});

const getOwnerNodesSuccess = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
});

const getOwnerNodesError = (state, payload) => ({
  ...state,
  error: payload,
  hasError: true,
  isLoading: false,
});

const clearOwnerNodes = () => ({ ...initialState });

const getOwnerNodesStrategiesList = {
  GET_OWNER_NODES: getOwnerNodes,
  GET_OWNER_NODES_SUCCESS: getOwnerNodesSuccess,
  GET_OWNER_NODES_ERROR: getOwnerNodesError,
  CLEAR_OWNER_NODES: clearOwnerNodes,
  __default__: state => state,
};

export const getOwnerNodesReducer = createReducer(
  getOwnerNodesStrategiesList,
  initialState
);

export const onboardReducer = combineReducers({
  uploadLetter: uploadLetterReducer,
  ownerNodes: getOwnerNodesReducer,
});
