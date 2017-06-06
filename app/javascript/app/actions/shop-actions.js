import {
  ADD_PRODUCT_TO_CART,
  CALCULATE_TOTAL,
  SET_CART_QUANTITY,
  DELETE_CART,
  SET_LOADING_SHOP_ACTIONS
} from '../constants/';

export const addProductToCart = (product, quantity) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, quantity }
});
export const deleteCart = id => ({
  type: DELETE_CART, payload: id
});
export const setCartQuantity = (id, quantity) => ({
  type: SET_CART_QUANTITY,
  payload: { id, quantity }
});
export const calculateTotal = () => ({
  type: CALCULATE_TOTAL
});
export const setLoadingShopActions = value => ({
  type: SET_LOADING_SHOP_ACTIONS,
  payload: value
});
