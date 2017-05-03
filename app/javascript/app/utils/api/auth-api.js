const { env } = require('process');
import axios from 'axios';

import {
  getHeadersForRequest
} from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/users' : '/api/v1/users';

const AuthAPI = {
  signup: (email, password) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'post',
      url: BASE_URL,
      data: { user: { email, password } },
      headers: {"Content-Type": 'application/json',},
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  signin: (email, password) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'post',
      url: `${BASE_URL}/sign_in`,
      headers: {"Content-Type": 'application/json',},
      data: { user: { email, password } },
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  signout: () => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'delete',
      url: `${BASE_URL}/sign_out`,
      headers: getHeadersForRequest(),
      responseType: 'json',
      cancel: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  }
}

export default AuthAPI;