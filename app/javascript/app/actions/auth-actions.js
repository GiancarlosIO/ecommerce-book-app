import {
  AUTH_USER,
  SET_USER_DATA,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_CREDIT_CARDS,
  SET_DEFAULT_CARD,
  ADD_CREDIT_CARD,
  REMOVE_CREDIT_CARD
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
export const setCreditCards = (cards) => ({type: SET_CREDIT_CARDS, payload: cards});
export const setDefaultCard = (card) => ({ type: SET_DEFAULT_CARD, payload: card });
export const addCreditCard = (card) => ({ type: ADD_CREDIT_CARD, payload: card });
export const removeCreditCard = (id) => ({ type: REMOVE_CREDIT_CARD, payload: id });

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

export const getCreditCards = () => {
  return (dispatch, getState, { CardAPI }) => {
    return CardAPI.index().request
      .then(response => {
        console.log('get credit cards successfully', response);
        if (response.data.cards.length > 0) {
          const objCards = {};
          response.data.cards.map(card => objCards[card.id] = card );
          dispatch(setCreditCards(objCards));
          const defaultCard = response.data.cards.filter(card => card.default);
          dispatch(setDefaultCard(defaultCard[0]));
        };
      })
      .catch(error => {
        console.log('error to get credit cards', error.response);
      })
  }
}

export const createCreditCard = (token) => {
  return (dispatch, getState, { CardAPI }) => {
    return CardAPI.create(token).request
      .then(response => {
        console.log('create card successfully', response);
        dispatch(addCreditCard(response.data.card));
      })
      .catch(error => {
        console.log('error to add card', error.response);
      });
  }
}

export const updateCard = (id) => {
  return (dispatch, getState, { CardAPI }) => {
    return CardAPI.setDefault(id).request
      .then(response => {
        console.log('update card successfully', response);
        const card = getState().auth.creditCards[id];
        dispatch(setDefaultCard(card));
      })
      .catch(error => {
        console.log('error to update card', error)
      })
  }
}

export const deleteCreditCard = (id) => {
  return (dispatch, getState, { CardAPI }) => {
    return CardAPI.delete(id).request
      .then(response => {
        console.log('card deleted successfully', response);
        dispatch(removeCreditCard(id));
      })
      .catch(error => {
        console.log('error to delete creditCard', error.response);
      })
  }
}