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
}
