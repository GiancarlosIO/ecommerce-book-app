import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// =========== Components ===========
import App from '../components/app';
import NotFound from '../components/public-pages/not-found';
// Layout
import Header from '../components/navigation/header';
import Footer from '../components/navigation/footer';
// authentication
import Register from '../components/auth/register';
import SignIn from '../components/auth/sign-in';
import Profile from '../components/auth/profile';


export default (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <footer />
    </div>
  </Router>
)