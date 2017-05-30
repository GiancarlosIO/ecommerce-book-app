import {
  SET_CHARGES,
  SET_LOADING_CHARGE
} from '../constants/';

export const setCharges = charges => ({
  type: SET_CHARGES,
  payload: charges
});

export const setLoadingCharge = loading => ({ type: SET_LOADING_CHARGE, payload: loading });

export const getCharges = () =>
  (dispatch, getState, { ChargeAPI }) =>
    ChargeAPI.index().request
      .then((response) => {
        console.log('get charges successfully', response);
      })
      .catch((error) => {
        console.log('error to get charges', error);
      });

export const createCharge = cart =>
  (dispatch, getState, { ChargeAPI }) =>
   ChargeAPI.create(cart).request
      .then((response) => {
        console.log('charge created', response);
        dispatch(setLoadingCharge(false));
        window.location.replace('/products');
      })
      .catch((error) => {
        console.log('error to create charge', error);
      });
