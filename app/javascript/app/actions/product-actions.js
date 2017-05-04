import {
  SET_PRODUCTS,
  SELECT_PRODUCT,
  UPDATE_PRODUCT
} from '../constants/';

import {
  setCategories
} from './category-actions';

export const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products });
export const selectProduct = (product) => ({ type: SELECT_PRODUCT, payload: product });
export const updateNote = (product) => ({ type: UPDATE_PRODUCT, payload: product });

export const getProducts = () => {
  return (dispatch, getState, { ProductAPI }) => {
    return ProductAPI.getProducts().request
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
        dispatch(setCategories(categoriesObj));
        console.log('get products successfully', response);
      })
      .catch(error => {
        console.log('error to get products', error.response);
      })
  }
}