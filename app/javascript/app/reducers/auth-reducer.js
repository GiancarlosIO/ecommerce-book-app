import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_USER_DATA
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: [],
  user: null
};

export const AuthReducer = (state=initialState, action) => {
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
    default:
      return state;
  }
}