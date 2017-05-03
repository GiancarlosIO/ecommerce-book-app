import {
  AUTH_USER,
  SET_USER_DATA,
  UNAUTH_USER,
  AUTH_ERROR
} from '../constants/';

import {
  resetSession,
  setSession,
  getSession
} from '../utils/api/header-config';

export const authUser = () => ({ type: AUTH_USER });
export const setUserData = (user) => ({ type: SET_USER_DATA, payload: user });
export const authError = (error) => ({ type: AUTH_ERROR, payload: error });
export const unauthUser = () => ({ type: UNAUTH_USER });

// Async actions

export const signupUser = (email, password) => {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signup(email, password).request
      .then(response => {
        console.log('signup user successfully', response);
        dispatch(authUser());
        dispatch(setUserData(response.data.user));
        setSession(response.data.user, response.data.session);
      })
      .catch( error => {
        console.log('error to signup user', error.response);
        dispatch(authError(error.response.data.error.user));
      });
  }
};

export const signinUser = (email, password) => {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signin(email, password).request
      .then(response => {
        console.log('signin user successfully', response);
        dispatch(authUser());
        dispatch(setUserData(response.data.user));
        setSession(response.data.user, response.data.session);
      })
      .catch(error => {
        console.log('error to signin user', error.response);
        // dispatch(authError(error.response.error.user));
      })
  }
};

export const signoutUser = () => {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signout().request
      .then(response => {
        console.log('signout user successfully', response);
        dispatch(unauthUser())
        resetSession();
      })
      .catch(error => {
        console.log('error to signout user', error.response);
        dispatch(authError(error.response.error.user));
      })
  }
};

