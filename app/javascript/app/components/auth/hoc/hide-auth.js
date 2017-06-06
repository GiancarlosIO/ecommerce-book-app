import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function (ComposeComponent) {
  class HideAuth extends Component {
    render() {
      const { authenticated } = this.props;
      return !authenticated ?
      (<ComposeComponent {...this.props} />) :
      (<Redirect to={{ pathname: '/products', state: { from: this.props.location } }} />);
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  return connect(mapStateToProps)(HideAuth);
}
