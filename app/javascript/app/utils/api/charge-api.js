import axios from 'axios';
import {
  getHeadersForRequest
} from './header-config';

const { env } = require('process');

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/charges' : '/api/v1/charges';

const ChargeAPI = {
  index: () => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'get',
      url: BASE_URL,
      headers: getHeadersForRequest(),
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  },
  create: (cart) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      url: BASE_URL,
      headers: getHeadersForRequest(),
      method: 'post',
      data: { charge: cart },
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  }
};

export default ChargeAPI;

