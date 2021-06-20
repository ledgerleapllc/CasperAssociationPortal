import { createReducer } from '../../../helpers/reducer-factory';

const initialState = {
  hasError: false,
  statusError: null,
};

const saveApiResponseError = (state, payload) => ({
  ...state,
  hasError: true,
  response: payload.data,
  statusError: payload.statusCode,
});

const clearApiResponseError = () => ({
  response: null,
  statusError: null,
});

const strategiesList = {
  SAVE_API_RESPONSE_ERROR: saveApiResponseError,
  CLEAR_API_RESPONSE_ERROR: clearApiResponseError,
  __default__: state => state,
};

export const apiControllerReducer = createReducer(strategiesList, initialState);
