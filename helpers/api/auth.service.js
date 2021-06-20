export const setToken = token => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const getToken = () => localStorage.getItem('ACCESS-TOKEN');
