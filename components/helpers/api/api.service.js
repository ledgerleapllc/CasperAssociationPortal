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

function _handleRespond(request, resolve, reject) {
  return request
    .then(resp => {
      resolve(resp.data);
    })
    .catch(err => {
      reject(err);
    });
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
  }

  get(uri, params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(createURL(uri), {
        params,
        ...moreConfigs,
      });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(
        createURL(uri),
        data,
        moreConfigs
      );
      _handleRespond(request, resolve, reject);
    });
  }

  put(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(createURL(uri), data, moreConfigs);
      _handleRespond(request, resolve, reject);
    });
  }

  delete(uri, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(createURL(uri), moreConfigs);
      _handleRespond(request, resolve, reject);
    });
  }
}
