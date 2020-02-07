let emailValidator = email => {
  if (email === "" || email === null) {
    return { valid: false, message: "email is required" };
  }

  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email.toLowerCase())) {
    return { valid: true, message: "email is valid" };
  }

  return { valid: false, message: "email is invalid" };
};

let passwordValidator = password => {
  let upperCaseLetter = /[A-Z]/;
  let lowerCaseLetter = /[a-z]/;
  let number = /[0-9]/;
  let specialCharacter = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  if (password === "" || password === null) {
    return { valid: false, message: "password is required" };
  }

  if (password.length < 6) {
    return { valid: false, message: "password must be at least 6 characters" };
  }

  if (!upperCaseLetter.test(password)) {
    return {
      valid: false,
      message: "password must have at least 1 uppercase letter"
    };
  }

  if (!lowerCaseLetter.test(password)) {
    return {
      valid: false,
      message: "password must have at least 1 lowercase letter"
    };
  }

  if (!number.test(password)) {
    return {
      valid: false,
      message: "password must have at least 1 number"
    };
  }

  if (!specialCharacter.test(password)) {
    return {
      valid: false,
      message: "password must have at least 1 special character like @ + /.."
    };
  }

  return { valid: true, message: "password is valid" };
};

let inputValidator = (input, requiredLength) => {
  if (input === "" || input === null || input === undefined) {
    return { valid: false, message: "*required" };
  }

  if (input.length < requiredLength) {
    return { valid: false, message: "input is invalid" };
  }

  return { valid: true, message: "input is valid" };
};

export { emailValidator, passwordValidator, inputValidator };
