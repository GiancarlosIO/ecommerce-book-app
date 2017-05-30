import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const NotFound = () => (
  <CSSTransitionGroup
    transitionName="fadeIn"
    transitionAppear
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <h1>Not found</h1>
    <p>lorem ipsum...</p>
  </CSSTransitionGroup>
);

export default NotFound;

