export const setToken = token => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const removeToken = () => {
  localStorage.removeItem('ACCESS-TOKEN');
};

export const getToken = () => localStorage.getItem('ACCESS-TOKEN');
