export const getDashboardDataDemo = () => ({
  type: 'GET_DASHBOARD_DATA_DEMO',
});

export const getListCategorySupportSuccess = data => ({
  type: 'GET_DASHBOARD_DATA_DEMO_SUCCESS',
  payload: data,
});

export const getListCategorySupportError = error => ({
  type: 'GET_DASHBOARD_DATA_DEMO_SUCCESS_ERROR',
  payload: error,
});
