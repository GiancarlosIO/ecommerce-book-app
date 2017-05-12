import axios from 'axios';
const { env } = require('process');

import {
  getHeadersForRequest
} from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/cards' : '/api/v1/cards';

const CardAPI = {
  index: () => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'get',
      url: BASE_URL,
      headers: getHeadersForRequest(),
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  create: (token) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'post',
      url: BASE_URL,
      data: { card: { token } },
      headers: getHeadersForRequest(),
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  delete: (id) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request= axios({
      method: 'delete',
      url: `${BASE_URL}/${id}`,
      headers: getHeadersForRequest(),
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  setDefault: (id) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'put',
      headers: getHeadersForRequest(),
      url: `${BASE_URL}/${id}`,
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  }
}

export default CardAPI;