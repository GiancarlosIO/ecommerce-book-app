import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth-reducer';
import ProductReducer from './product-reducer';
import CategoryReducer from './category-reducer';
import ShopReducer from './shop-reducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  categories: CategoryReducer,
  shop: ShopReducer,
  form: formReducer
});

export default rootReducer;
