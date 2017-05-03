import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect }  from 'react-router-dom';

export default function(ComposeComponent) {
  class RequireAuth extends Component {
    render() {
      const { authenticated } = this.props;
      return (
        authenticated ?
        (<ComposeComponent {...this.props} />) :
        (<Redirect to={{ pathname: "/sign_in", state: { from: this.props.location } }} />)
      );
    };
  };

  const mapStateToProps = (state) => ({ authenticated: state.auth.authenticated });
  return connect(mapStateToProps)(RequireAuth);
}