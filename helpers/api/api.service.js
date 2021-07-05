import axios from 'axios';

function createURL(uri) {
  let paramsUrl;
  if (typeof uri[uri.length - 1] !== 'string') {
    paramsUrl = uri.pop();
    let url = uri.join('/');
    Object.keys(paramsUrl).forEach(x => {
      url = url.replace(`:${x}`, paramsUrl[x]);
    });
    return url;
  }
  return uri.join('/');
}

const API_DOMAIN = process.env.BASE_URL;
export class ApiService {
  axiosInstance;

  constructor() {
    // Init axiosInstance
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/api/v1/`,
      // Common header
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use(_config => {
      const token = localStorage.getItem('ACCESS-TOKEN');
      if (token) _config.headers.Authorization = `Bearer ${token}`;
      return _config;
    });
  }

  doGet(uri, moreConfigs = {}) {
    return this.axiosInstance.get(createURL(uri), moreConfigs);
  }

  doPost(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.post(createURL(uri), data, moreConfigs);
  }

  doPut(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.put(createURL(uri), data, moreConfigs);
  }

  doDelete(uri, data = {}, moreConfigs = {}) {
    return this.axiosInstance.delete(createURL(uri), data, moreConfigs);
  }
}
