import {
  ADD_PRODUCT_TO_CART,
  CALCULATE_TOTAL
} from '../constants/';

export const addProductToCart = (product, quantity) => ({ type: ADD_PRODUCT_TO_CART, payload: {product, quantity} });
export const calculateTotal = () => ({ type: CALCULATE_TOTAL });