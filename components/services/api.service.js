import axios from 'axios';

export class ApiService {

  axiosInstance;

  constructor() {
    // Init axiosInstance
    this.axiosInstance = axios.create({
      // Common header
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  createURL(uri) {
    let paramsUrl;
    if (typeof uri[uri.length - 1] !== 'string') {
      paramsUrl = uri.pop();
      let url = uri.join('/');
      Object.keys(paramsUrl).forEach(x => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join('/');
    }
  }

  get(uri, params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), { params, ...moreConfigs });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(this.createURL(uri), moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  multipeGets(apiRequests) {
    const apiReqs = apiRequests.map((v) =>
    this.axiosInstance.get(v),
    );
    return new Promise((resolve, reject) => {
      axios.all(apiReqs)
        .then((resp) => {
          resolve(resp.map((v) => v.data));
        })
        .catch((err) => reject(err));
    });
  }

  private _handleRespond(request, resolve, reject) {
    return request.then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  }
}
