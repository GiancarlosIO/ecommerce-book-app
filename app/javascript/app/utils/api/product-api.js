import axios from 'axios';

const { env } = require('process');

// import {
//   getHeaderForRequest
// } from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/products' : '/api/v1/products';

const ProductAPI = {
  getProducts: (page = 1) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'get',
      url: `${BASE_URL}?page=${page}`,
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  },
  getProductById: (id) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const request = axios({
      method: 'get',
      url: `${BASE_URL}/${id}`,
      responseType: 'json',
      cancelToken: new CancelToken((c) => { cancel = c; })
    });
    return { request, cancel };
  }
};

export default ProductAPI;
