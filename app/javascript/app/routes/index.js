import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// =========== Components ===========
import App from '../components/app';
import NotFound from '../components/public-pages/not-found';
// Products
import Products from '../components/products/';
// Products details
import ProductsShow from '../components/products-show/';
// Layout
import Header from '../components/navigation/header';
import Footer from '../components/navigation/footer';
// authentication
import Register from '../components/auth/register';
import SignIn from '../components/auth/sign-in';
import Profile from '../components/auth/profile';
// Hide order component
import RequireAuth from '../components/auth/hoc/require-auth';
import HideAuth from '../components/auth/hoc/hide-auth';


export default (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={HideAuth(Register)} />
        <Route path="/sign_in" component={HideAuth(SignIn)} />
        <Route path="/profile" component={RequireAuth(Profile)} />
        <Route exact path="/products/:id" component={ProductsShow} />
        <Route exact path="/products" component={Products} />
        <Route component={NotFound} />
      </Switch>
      <footer />
    </div>
  </Router>
)