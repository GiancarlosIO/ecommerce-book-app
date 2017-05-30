import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldForm = (props) => {
  const {
    name, className, input, label, type, placeholder,
    meta: { touched, error, warning }
  } = props;
  return (
    <FormGroup
      validationState={
        (touched && (error && 'error')) || (warning && 'warning')
      }
    >
      { label &&
        <ControlLabel>
          { label }
        </ControlLabel>
      }
      <FormControl
        name={name}
        className={className}
        type={type}
        placeholder={placeholder}
        {...input}
      />
      <FormControl.Feedback />
      {
        (touched && (error && <HelpBlock>{error}</HelpBlock>)) ||
        (warning && <HelpBlock>{warning}</HelpBlock>)
      }
    </FormGroup>
  );
};

FieldForm.PropTypes = {
  type: PropTypes.string.isRequired
};

export default FieldForm;
