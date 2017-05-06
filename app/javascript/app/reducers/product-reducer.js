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

const initialState = {
  all: null,
  productSelected: null,
  textSearch: null,
  pages: null,
  pagesShowing: null,
  loading: false,
  loadingPerPage: false,
  errorToGetProduct: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        all: action.payload,
      };
    case SET_PAGES_PRODUCTS:
      return {
        ...state,
        pages: action.payload
      }
    case SET_PAGES_SHOWING:
      return {
        ...state,
        pagesShowing: action.payload
      }
    case ADD_PRODUCTS_COLLECTION:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.payload
        }
      }
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
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOADING_PER_PAGE:
      return {
        ...state,
        loadingPerPage: action.payload
      }
    case ERROR_TO_GET_PRODUCT:
      return {
        ...state,
        productSelected: null,
        errorToGetProduct: action.payload
      }
    default:
      return state;
  }
}