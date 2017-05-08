import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_USER_DATA,
  SET_CREDIT_CARDS,
  SET_DEFAULT_CARD
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
      return {
        ...state,
        creditCardDefault: action.payload
      }
    default:
      return state;
  }
}

export default AuthReducer;