export const saveApiResponse = () => ({
  type: 'SAVE_API_RESPONSE',
});

export const saveApiResponseSuccess = data => ({
  type: 'SAVE_API_RESPONSE_SUCCESS',
  payload: data,
});

export const saveApiResponseError = error => ({
  type: 'SAVE_API_RESPONSE_ERROR',
  payload: error,
});

export const clearApiResponseError = () => ({
  type: 'CLEAR_API_RESPONSE_ERROR',
});
