import {
  SELECT_CARD,
  SET_TOKEN_CARD,
  ADD_PRODUCT_TO_CART,
  CALCULATE_TOTAL,
  SET_CART_QUANTITY,
  DELETE_CART,
  SET_LOADING_SHOP_ACTIONS
} from '../constants';

const initialState = {
  productsInCart: {},
  subtotal: 0.00,
  total: 0.00,
  cardSelected: null,
  cardToken: null,
  loadingShopActions: false
};

const ShopReducer = (state = initialState, action) => {
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
      };
    // End Stripe actions
    case ADD_PRODUCT_TO_CART: {
      const product = action.payload.product;
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
      };
    }
    case SET_CART_QUANTITY:
      return {
        ...state,
        productsInCart: {
          ...state.productsInCart,
          [`${action.payload.id}`]: {
            ...state.productsInCart[`${action.payload.id}`],
            quantity: action.payload.quantity
          }
        }
      };
    case DELETE_CART: {
      const carts = { ...state.productsInCart };
      delete carts[`${action.payload}`];
      return {
        ...state,
        productsInCart: carts
      };
    }
    case CALCULATE_TOTAL: {
      const products = { ...state.productsInCart };
      const prices = Object.keys(products).map((i) => {
        const product = products[`${i}`];
        return parseFloat(product.price) * parseFloat(product.quantity);
      }).reduce((a, b) => Number(a) + Number(b));
      return {
        ...state,
        subtotal: prices.toFixed(2),
        total: (prices + (prices * 0.18)).toFixed(2)
      };
    }
    case SET_LOADING_SHOP_ACTIONS:
      return {
        ...state,
        loadingShopActions: action.payload
      };
    default:
      return state;
  }
};

export default ShopReducer;
