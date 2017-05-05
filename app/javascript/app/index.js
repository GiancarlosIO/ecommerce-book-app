import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
// Actions
import { authUser, setUserData } from './actions/auth-actions';
// Routes
import Routes from './routes/';
// Reducers
import RootReducers from './reducers/';
// APIs
import AuthAPI from './utils/api/auth-api';
import ProductAPI from './utils/api/product-api';
// utils
import { verifyToken, getSession } from './utils/api/header-config';
// configure Redux extension
const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// default store
// const storeWithMiddlewares = applyMiddleware(
//   ReduxThunk
// )(createStore);
// export const store = storeWithMiddlewares(RootReducers);
export const store = createStore(RootReducers, {}, componseEnhancers(
  applyMiddleware(ReduxThunk.withExtraArgument({ AuthAPI, ProductAPI }))
));

// validate session
const session = getSession();
if (session && verifyToken()) {
  store.dispatch(authUser());
  store.dispatch(setUserData(session));
}

// for debuggin
// window.store = store;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      { Routes }
    </Provider>
    , document.getElementById('app')
  );
});