import {
  SET_PRODUCTS,
  SET_PAGES_PRODUCTS,
  SET_PAGES_SHOWING,
  ADD_PRODUCTS_COLLECTION,
  SELECT_PRODUCT,
  UPDATE_PRODUCT,
  LOADING,
  LOADING_PER_PAGE,
  ERROR_TO_GET_PRODUCT
} from '../constants/';

import {
  setCategories
} from './category-actions';

export const setProducts = (products, pages) => ({ type: SET_PRODUCTS, payload:products });
export const setPagesProducts = (pages) => ({ type: SET_PAGES_PRODUCTS, payload: pages });
export const setPagesShowing = (pages) => ({ type: SET_PAGES_SHOWING, payload: pages });
export const addProductsCollection = (products) => ({ type: ADD_PRODUCTS_COLLECTION, payload: products });
export const selectProduct = (product) => ({ type: SELECT_PRODUCT, payload: product });
export const updateNote = (product) => ({ type: UPDATE_PRODUCT, payload: product });
export const loadingProducts = (loading) => ({ type: LOADING, payload: loading });
export const setLoadingPerPage = (loadingPerPage) => ({ type: LOADING_PER_PAGE, payload: loadingPerPage });
export const setErrorToGetProduct = (error) => ({ type: ERROR_TO_GET_PRODUCT, payload: error });

export const getProducts = () => {
  return (dispatch, getState, { ProductAPI }) => {
    return ProductAPI.getProducts(1).request
      .then(response => {
        const productsObj = {};
        const categoriesObj = {};
        response.data.products.forEach(product => {
          productsObj[product.id] = product;
        });
        response.data.categories.forEach(category => {
          categoriesObj[category.id] = category;
        });
        dispatch(setProducts(productsObj));
        dispatch(setPagesProducts(response.data.pages));
        dispatch(setPagesShowing(1));
        dispatch(setCategories(categoriesObj));
        dispatch(loadingProducts(false));
        console.log('get products successfully', response);
      })
      .catch(error => {
        console.log('error to get products', error.response);
        dispatch(loadingProducts(false));
      })
  }
}

export const getProductsPerPage = (page) => {
  return (dispatch, getState, { ProductAPI }) => {
    return ProductAPI.getProducts(page).request
      .then(response => {
        const productsObj = {};
        response.data.products.forEach(product => {
          productsObj[product.id] = product;
        });
        dispatch(addProductsCollection(productsObj));
        dispatch(setPagesProducts(response.data.pages));
        dispatch(setPagesShowing(page));
        dispatch(setLoadingPerPage(false));
        console.log('get products by page successfully', response);
      })
      .catch(error => {
        console.log('error to get products by page', error.response);
        dispatch(setLoadingPerPage(false));
      })
  }
};

export const getProductById = (id) => {
  return (dispatch, getState, { ProductAPI }) => {
    return ProductAPI.getProductById(id).request
      .then(response => {
        console.log('get product succcessfully');
        dispatch(selectProduct(response.data.product));
      })
      .catch(error => {
        console.log('error to get product', error.response);
        if (error.response.status === 404) {
          dispatch(setErrorToGetProduct(error.response.data.error));
        }
      })
  }
}