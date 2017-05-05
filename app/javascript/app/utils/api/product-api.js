const { env } = require('process');
import axios from 'axios';

// import {
//   getHeaderForRequest
// } from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/products' : '/api/v1/products';

const ProductAPI = {
  getProducts: (page=1) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'get',
      url: `${BASE_URL}?page=${page}`,
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  }
}

export default ProductAPI;