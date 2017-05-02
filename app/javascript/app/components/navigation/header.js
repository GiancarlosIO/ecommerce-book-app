import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import CustomLink from './custom-link';

export class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ecommerce-app</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <CustomLink to="/register" label="Register" />
            <CustomLink to="/sign_in" label="Sign in"/>
            <CustomLink to="/profile" label="Profile"/>
          </Nav>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a>Sign out</a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

const HeaderConnected = connect()(Header);
export default withRouter(HeaderConnected);