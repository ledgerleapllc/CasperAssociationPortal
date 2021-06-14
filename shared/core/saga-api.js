import { ApiService } from '../../helpers/api/api.service';

class ErrorHandler {
  data;

  statusCode;

  constructor(error) {
    this.statusCode = error.response.status;
    this.data = error.response.data;
  }
}

const apiService = new ApiService();
export function* get(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doGet(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
    }
    throw new ErrorHandler(e);
  }
}

export function* post(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPost(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
    }
    throw new ErrorHandler(e);
  }
}

export function* put(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doPut(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
    }
    throw new ErrorHandler(e);
  }
}

export function* destroy(url, params = {}, headers = {}) {
  try {
    const res = yield apiService.doDelete(url, params, headers);
    return res.data;
  } catch (e) {
    if (+e.response.status === 401) {
      localStorage.clear();
    }
    throw new ErrorHandler(e);
  }
}
