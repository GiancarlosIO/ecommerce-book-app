import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth-reducer';
import ProductReducer from './product-reducer';
import CategoryReducer from './category-reducer';
import ShopReducer from './shop-reducer';
import ChargeReducer from './charge-reducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  categories: CategoryReducer,
  shop: ShopReducer,
  charge: ChargeReducer,
  form: formReducer
});

export default rootReducer;
