import {
  SET_CATEGORIES,
  SELECT_CATEGORY
} from '../constants/';

const initialState = {
  all: null,
  categorySelected: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        all: action.payload
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected: action.payload
      };
    default:
      return state;
  }
}
