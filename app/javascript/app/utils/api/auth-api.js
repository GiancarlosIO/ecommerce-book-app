import axios from 'axios';
import {
  getHeadersForRequest
} from './header-config';

const { env } = require('process');

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/users' : '/api/v1/users';

const AuthAPI = {
  signup: (email, password) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'post',
      url: BASE_URL,
      data: { user: { email, password } },
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  },
  signin: (email, password) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'post',
      url: `${BASE_URL}/sign_in`,
      headers: { 'Content-Type': 'application/json' },
      data: { user: { email, password } },
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  },
  signout: () => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'delete',
      url: `${BASE_URL}/sign_out`,
      headers: getHeadersForRequest(),
      responseType: 'json',
      cancel: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  }
};

export default AuthAPI;
