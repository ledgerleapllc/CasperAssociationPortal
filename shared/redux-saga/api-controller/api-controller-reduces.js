import { createReducer } from '../../../helpers/reducer-factory';

const initialState = {
  hasError: false,
  response: null,
  statusError: null,
};

const saveApiResponse = state => ({
  ...state,
});

const saveApiResponseSuccess = (state, payload) => ({
  ...state,
  response: payload,
});

const saveApiResponseError = (state, payload) => ({
  ...state,
  hasError: true,
  response: payload.data,
  statusError: payload.statusCode,
});

const strategiesList = {
  ['SAVE_API_RESPONSE']: saveApiResponse,
  ['SAVE_API_RESPONSE_SUCCESS']: saveApiResponseSuccess,
  ['SAVE_API_RESPONSE_ERROR']: saveApiResponseError,
  __default__: state => state,
};

export const apiControllerReducer = createReducer(strategiesList, initialState);
