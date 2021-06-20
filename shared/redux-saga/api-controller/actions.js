export const saveApiResponseError = error => ({
  type: 'SAVE_API_RESPONSE_ERROR',
  payload: error,
});

export const clearApiResponseError = () => ({
  type: 'CLEAR_API_RESPONSE_ERROR',
});
