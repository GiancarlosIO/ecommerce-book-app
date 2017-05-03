import {
  AUTH_USER,
  SET_USER_DATA,
  UNAUTH_USER,
  AUTH_ERROR
} from '../constants/';

export const authUser = () => ({ type: AUTH_USER });
export const setUserData = (user) => ({ type: SET_USER_DATA, payload: user });
export const authError = (error) => ({ type: AUTH_ERROR, payload: error });
export const unauthUser = () => ({ type: UNAUTH_USER });

// Async actions

export const signupUser = ({email, password, password_confirmation}) => {
  return (dispatch, getState) => {

  }
};

export const signinUser = (password, email) => {
  return (dispatch, getState) => {

  }
};

export const signOutUser = () => {

}