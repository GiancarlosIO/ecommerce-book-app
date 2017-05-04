import {
  SET_PRODUCTS,
  SELECT_PRODUCT,
  UPDATE_PRODUCT
} from '../constants/';

const initialState = {
  all: null,
  productSelected: null,
  textSearch: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        all: action.payload
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        productSelected: action.payload
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
}