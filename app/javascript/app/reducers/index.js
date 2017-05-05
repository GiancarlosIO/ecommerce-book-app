import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth-reducer';
import ProductReducer from './product-reducer';
import CategoryReducer from './category-reducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  categories: CategoryReducer,
  form: formReducer
});

export default rootReducer;