import {
  SELECT_CARD,
  SET_TOKEN_CARD,
  ADD_PRODUCT_TO_CAR
} from '../constants';

const initialState = {
  inShop: false,
  productsInCar: [],
  cardSelected: null,
  cardToken: null
}

const ShopReducer = (state=initialState, action) => {
  switch (action.type) {
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
    case ADD_PRODUCT_TO_CAR:
      return {
        ...state,
        productsInCard: [
          ...state.productsInCar,
          action.payload
        ]
      }
    default:
      return state;
  }
}

export default ShopReducer;