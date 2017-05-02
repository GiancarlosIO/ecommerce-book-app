import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import { Button, Col, Row, Panel } from 'react-bootstrap';
import FieldForm from './field';
import { validateSigninForm } from './form-validations/';

export class SignIn extends Component {

  onSubmit = (values, dispatch, formProps) => {
    console.log('Sign in form', values);
  }

  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <Row>
        <Col xs={12} sm={6} lg={4} smOffset={3} lgOffset={4}>
          <Panel header="Sign In">
            <form onSubmit={handleSubmit(this.onSubmit)}>
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
})(SignIn)

export default connect()(SignInConfigured);