const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.errorMessage = !isEmpty(data.errorMessage) ? data.errorMessage : '';
  // Email checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "User Name field is required";
    errors.errorMessage = errors.username;
  } else if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
    errors.errorMessage = errors.password;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validateRegisterInput(data) {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.errorMessage = !isEmpty(data.errorMessage) ? data.errorMessage : '';
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    errors.errorMessage = errors.email;
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
    errors.errorMessage = errors.email;
  } else if (Validator.isEmpty(data.username)) {
    errors.username = "User Name field is required";
    errors.errorMessage = errors.username;
  } else if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
    errors.errorMessage = errors.password;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export { validateLoginInput, validateRegisterInput };
