import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// =========== Components ===========
import Landing from '../components/landing/';
import NotFound from '../components/public-pages/not-found';
// User Profile
import Profile from '../components/profile/';
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
// Shop components
import Shopping from '../components/shopping/';
// Hide order component
import RequireAuth from '../components/auth/hoc/require-auth';
import HideAuth from '../components/auth/hoc/hide-auth';


export default (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={HideAuth(Register)} />
        <Route path="/sign_in" component={HideAuth(SignIn)} />
        <Route path="/profile" component={RequireAuth(Profile)} />
        <Route path="/products/:id" component={ProductsShow} />
        <Route path="/products" component={Products} />
        <Route path="/shopping" component={Shopping} />
        <Route component={NotFound} />
      </Switch>
      <footer />
    </div>
  </Router>
)