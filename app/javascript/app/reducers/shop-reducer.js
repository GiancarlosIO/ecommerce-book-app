import {
  SELECT_CARD,
  SET_TOKEN_CARD,
  ADD_PRODUCT_TO_CART
} from '../constants';

const initialState = {
  productsInCart: [],
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
      return {
        ...state,
        productsInCart: [
          ...state.productsInCart,
          action.payload
        ]
      }
    default:
      return state;
  }
}

export default ShopReducer;