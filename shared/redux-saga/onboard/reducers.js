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

export const onboardReducer = combineReducers({
  uploadLetter: uploadLetterReducer,
});
