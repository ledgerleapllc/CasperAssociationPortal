import qs from 'qs';
import { ApiService } from '../helpers/api/api.service';

export default class AuthService {
  http;

  constructor() {
    this.http = new ApiService();
  }

  login(data) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(['auth/login'], qs.stringify(data), {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  resetPassword(data) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(['auth/send-reset-password'], qs.stringify(data), {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  verifyEmail(data) {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(['users/verify-email'], qs.stringify(data), {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  resend2FaCode() {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(['users/resend-verify-email'], null, {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  updateEmail(data) {
    const token = localStorage.getItem('ACCESS-TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      email: data.email,
    });
    return new Promise((resolve, reject) => {
      this.http
        .post(['users/change-email'], params, {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  updateNewPassword(data) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      code: data.code,
      email: data.email,
      password: data.password,
    });
    return new Promise((resolve, reject) => {
      this.http
        .post(['auth/reset-password'], params, {
          headers,
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
