import {
  SET_CATEGORIES,
  SELECT_CATEGORY
} from '../constants/';

const initialState = {
  all: null,
  categorySelected: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      console.log('from reducer', action);
      return {
        ...state,
        all: action.payload
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected: action.payload
      }
    default:
      return state;
  }
}