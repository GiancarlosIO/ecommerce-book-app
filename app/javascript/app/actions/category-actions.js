import {
  SET_CATEGORIES,
  SELECT_CATEGORY
} from '../constants/';

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const selectCategory = (category) => ({ type: SELECT_CATEGORY, payload: category });
