import {
  SELECT_CARD,
  SET_TOKEN_CARD,
  ADD_PRODUCT_TO_CART
} from '../constants';

const initialState = {
  productsInCart: {},
  cardSelected: null,
  cardToken: null
}

const ShopReducer = (state=initialState, action) => {
  switch (action.type) {
    // Stripe actions
    case SELECT_CARD:
      return {
        ...state,
        cardSelected: action.payload
      };
    case SET_TOKEN_CARD:
      return {
        ...state,
        cardToken: action.payload
      }
    // End Stripe actions
    case ADD_PRODUCT_TO_CART:
      let product = action.payload.product;
      if (state.productsInCart[`${product.id}`]) {
        product.quantity = action.payload.quantity + state.productsInCart[`${product.id}`].quantity;
      } else {
        product.quantity = action.payload.quantity;
      }
      return {
        ...state,
        productsInCart: {
          ...state.productsInCart,
          [`${product.id}`]: product
        }
      }
    default:
      return state;
  }
}

export default ShopReducer;