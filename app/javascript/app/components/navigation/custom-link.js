import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomLink = ({label, to, activeOnlyWhenExact, childrenComponent}) => (
  <Route
    to={to}
    path={to}
    exact={activeOnlyWhenExact}
    children={ (props) => (
        <li className={props.match ? 'active': ''}>
            {
              childrenComponent ?
              childrenComponent :
              <Link to={to}>
                {label}
              </Link>
            }
        </li>
      )}
  />
)

CustomLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
  childrenComponent: PropTypes.element
}

export default CustomLink;