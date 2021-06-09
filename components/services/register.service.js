import qs from 'qs';
import { ApiService } from '../helpers/api/api.service';

export default class RegisterService {
  http;

  constructor() {
    this.http = new ApiService();
  }

  registerIndividual(data) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = qs.stringify({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      pseudonym: data.pseudonym,
      telegram: data.telegram,
    });
    return new Promise((resolve, reject) => {
      this.http
        .post(['auth/register-individual'], params, {
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
