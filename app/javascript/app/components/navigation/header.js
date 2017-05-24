import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import CustomLink from './custom-link';
import { signoutUser } from '../../actions/auth-actions';
import {
  Navbar,
  Nav,
  NavItem,
  Glyphicon
} from 'react-bootstrap';

export class Header extends Component {

  handleClickSignout = () => {
    this.props.dispatch(signoutUser());
  }

  renderLinks = () => {
    const { authenticated } = this.props;
    if (authenticated) {
      return [
        <CustomLink key={1} to="/profile" label="Profile"/>,
        <CustomLink key={2} to="/products" label="Products" />
      ]
    } else {
      return [
        <CustomLink key={1} to="/register" label="Register" />,
        <CustomLink key={2} to="/sign_in" label="Sign in"/>,
        <CustomLink key={3} to="/products" label="Products" />
      ]
    }
  }

  render() {
    const { authenticated, productsCartCount } = this.props;
    return (
      <Navbar inverse collapseOnSelect fluid className="margin-none" fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ecommerce-app</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.renderLinks()}
          </Nav>
            {
              authenticated &&
              <ul className="nav navbar-nav navbar-right">
                  <CustomLink to="/shopping" childrenComponent={
                    <Link to="/shopping">
                      <Glyphicon glyph="shopping-cart" /> { productsCartCount }
                    </Link>
                  }
                />
                <li>
                  <a className="cursor-pointer" onClick={this.handleClickSignout} >Sign out</a>
                </li>
              </ul>
            }
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

const mapStateToProps = (state) => {
  const products = state.shop.productsInCart;
  const count = Object.keys(products).length > 0 ? Object.keys(products).map( i => products[`${i}`].quantity ).reduce((a, b) => parseInt(a) + parseInt(b) ) : 0;
  return {
    authenticated: state.auth.authenticated,
    productsCartCount: count
  }
};

const HeaderConnected = connect(mapStateToProps)(Header);
export default withRouter(HeaderConnected);