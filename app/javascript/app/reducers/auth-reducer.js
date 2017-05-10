import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_USER_DATA,
  SET_CREDIT_CARDS,
  SET_DEFAULT_CARD,
  ADD_CREDIT_CARD,
  REMOVE_CREDIT_CARD
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: null,
  user: null,
  creditCardDefault: null,
  creditCards: null
};

const AuthReducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        errors: []
      };
    case UNAUTH_USER:
      return {
        ...state,
        user: null,
        authenticated: false,
        errors: []
      }
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        errors: []
      };
    case SET_CREDIT_CARDS:
      return {
        ...state,
        creditCards: action.payload
      };
    case SET_DEFAULT_CARD:
      let creditCards = { ...state.creditCards };
      Object.keys(creditCards).forEach( key => {
        if (creditCards[key].id == action.payload.id) {
          creditCards[key].default = true;
        } else {
          creditCards[key].default = false;
        }
      });
      return {
        ...state,
        creditCardDefault: action.payload,
        creditCards
      }
    case ADD_CREDIT_CARD:
      return {
        ...state,
        creditCards: {
          ...state.creditCards,
          [`${action.payload.id}`]: action.payload
        }
      };
    case REMOVE_CREDIT_CARD:
      let cards = { ...state.creditCards };
      delete cards[action.payload];
      return {
        ...state,
        creditCards: cards
      }
    default:
      return state;
  }
}

export default AuthReducer;