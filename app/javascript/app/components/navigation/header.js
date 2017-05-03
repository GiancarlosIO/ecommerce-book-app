import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import CustomLink from './custom-link';
import { signoutUser } from '../../actions/auth-actions';

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
    const { authenticated } = this.props;
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
            {this.renderLinks()}
          </Nav>
            {
              authenticated &&
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.handleClickSignout} >Sign out</a>
                </li>
              </ul>
            }
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

const mapStateToProps = (state) => ({ authenticated: state.auth.authenticated });

const HeaderConnected = connect(mapStateToProps)(Header);
export default withRouter(HeaderConnected);