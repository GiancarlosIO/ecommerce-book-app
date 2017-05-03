import React from 'react';
import { Route, Link } from 'react-router-dom';

const CustomLink = ({label, to, activeOnlyWhenExact}) => (
  <Route
    to={to}
    path={to}
    exact={activeOnlyWhenExact}
    children={ (props) => (
        <li className={props.match ? 'active': ''}>
          <Link to={to}>{label}</Link>
        </li>
      )}
  />
)

export default CustomLink;