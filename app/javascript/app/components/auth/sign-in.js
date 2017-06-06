import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Col, Row, Panel, Alert, Glyphicon } from 'react-bootstrap';
import FieldForm from './field';
import { validateSigninForm } from './form-validations/';

import { signinUser, clearAuthErrors } from '../../actions/auth-actions';

export class SignIn extends Component {

  componentWillUnmount() {
    this.props.dispatch(clearAuthErrors());
  }

  onSubmit = (values) => {
    console.log('Sign in form', values);
    this.props.dispatch(signinUser(values.email, values.password));
  }

  renderErrors = () => {
    const { errors } = this.props;
    if (errors) {
      const errorsArray = errors.map((error, index) => (
        <Alert key={index} bsStyle="warning">
          <Glyphicon glyph="warning-sign" />  { error }
        </Alert>
      ));
      return (<div>{errorsArray}</div>);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col xs={12} sm={6} lg={4} smOffset={3} lgOffset={4}>
          <Panel header="Sign In">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              { this.renderErrors() }
              <Field
                name="email"
                type="email"
                component={FieldForm}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={FieldForm}
                label="Password"
              />
              <Button type="submit" bsStyle="primary" block>
                Sign in
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    )
  }
}

const SignInConfigured = reduxForm({
  form: 'signin',
  validate: validateSigninForm
})(SignIn);

const mapStateToProps = (state) => ({ errors: state.auth.errors });

export default connect(mapStateToProps)(SignInConfigured);
