export const validateSigninForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter a email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  if (!values.password) errors.password = "Enter a password";
  return errors;
};

export const validateRegisterForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter a email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  };
  if (!values.password) errors.password = "Enter a password";
  if (!values.password_confirmation) {
    errors.password_confirmation = "Enter the password confirmation";
  } else if ( values.password !== values.password_confirmation ) {
    errors.password_confirmation = "Password confirmation not match with password";
  }
  return errors;
};

export const validateProfileForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter a email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
};

export const validatePasswordForm = values => {
  const errors = {};
  if (!values.password) errors.password = "Enter a password";
  if (!values.password_confirmation) {
    errors.password_confirmation = "Enter the password confirmation";
  } else if ( values.password !== values.password_confirmation ) {
    errors.password_confirmation = "Password confirmation not match with password";
  }
}