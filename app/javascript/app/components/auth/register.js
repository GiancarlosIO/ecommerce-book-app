import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import { Button, Panel, Row, Col } from 'react-bootstrap';
import FieldForm from './field';

import { validateRegisterForm } from './form-validations/';

export class Register extends Component {

  onSubmit = (values, dispatch, formProps) => {
    console.log('register form', values);
  }

  renderErrors = () => {
    const { errors } = this.props;
    if (errors) {
      let errorsArray = errors.map((error, index) => (<li key={index}>{error}</li>));
      return (<div><ul>{errorsArray}</ul></div>);
    }
  }

  render(){
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <Row>
        <Col xs={12} sm={6} md={6} lg={4} lgOffset={4} mdOffset={3} smOffset={3}>
          <Panel header="Register">
            <form onSubmit={handleSubmit(this.onSubmit)} >
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
                label="password"
              />
              <Field
                name="password_confirmation"
                type="password"
                component={FieldForm}
                label="Password confirmation"
              />
              <Button type="submit" bsStyle="primary" block>
                Register
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    )
  }
}

const RegisterConfigured = reduxForm({
  form: 'register',
  validate: validateRegisterForm
})(Register);

export default connect()(RegisterConfigured);