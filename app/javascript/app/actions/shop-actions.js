import {
  ADD_PRODUCT_TO_CART
} from '../constants/';

export const addProductToCart = (product, quantity) => ({ type: ADD_PRODUCT_TO_CART, payload: {product, quantity} });