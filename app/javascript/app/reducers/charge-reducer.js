import {
  SET_CHARGES,
  SET_LOADING_CHARGE
} from '../constants/';

const initialState = {
  all: null,
  loadingCharge: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHARGES:
      return {
        ...state,
        all: action.payload
      };
    case SET_LOADING_CHARGE:
      return {
        ...state,
        loadingCharge: action.payload
      };
    default:
      return state;
  }
}
