export const API_PROCESS = {
  UNFETCH: 0,
  LOADING: 1,
  SUCESS: 2,
  FAILED: 3,
};

export const initialState = {
  process: API_PROCESS.UNFETCH,
  data: null,
  error: null,
};

export const callingApi = state => ({
  ...state,
  process: API_PROCESS.LOADING,
  data: null,
  error: null,
});


export const handleApiSuccess = (state, payload) => ({
  ...state,
  process: API_PROCESS.SUCESS,
  data: payload,
  error: null,
});

export const handleApiError = (state, payload) => ({
  ...state,
  process: API_PROCESS.FAILED,
  data: null,
  error: payload,
});

export const clearApiRes = () => ({
  ...initialState,
});
