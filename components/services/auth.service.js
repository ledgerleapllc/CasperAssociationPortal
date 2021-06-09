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
}
