import React, { Component } from "react";
import "./SignUpPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Logo from "../Shared/Logo/Logo.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";
import {
  emailValidator,
  passwordValidator
} from "../../Functions/Validators.js";
import { Link } from "react-router-dom";
import Button from "../Shared/Button/Button.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class UnconnectedSignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      emailInputBorder: "1px solid #CFD4DD",
      passwordInputBorder: "1px solid #CFD4DD",
      confirmPasswordInputBorder: "1px solid #CFD4DD",
      email: "",
      password: "",
      confirmPassword: "",
      emailInputErrorMessage: "",
      passwordInputErrorMessage: "",
      confirmPasswordInputErrorMessage: "",
      keepUserLoggedIn: false,
      signUpErrorMessage: ""
    };
  }

  onChangeInputText = (type, value) => {
    this.setState({
      [type]: value,
      [type + "InputBorder"]: "1px solid #CFD4DD",
      [type + "InputErrorMessage"]: ""
    });
  };

  confirmInput = type => {
    if (type === "email") {
      let emailCheckObject = emailValidator(this.state.email);
      if (!emailCheckObject.valid) {
        this.setState({
          [type + "InputBorder"]: "1px solid #ff9d8e",
          [type + "InputErrorMessage"]: emailCheckObject.message
        });
        return false;
      }

      return true;
    }

    if (type === "password") {
      let passwordCheckObject = passwordValidator(this.state.password);
      if (!passwordCheckObject.valid) {
        this.setState({
          [type + "InputBorder"]: "1px solid #ff9d8e",
          [type + "InputErrorMessage"]: passwordCheckObject.message
        });
        return false;
      }
      return true;
    }

    if (type === "confirmPassword") {
      let passwordCheckObject = passwordValidator(this.state.confirmPassword);
      if (!passwordCheckObject.valid) {
        this.setState({
          [type + "InputBorder"]: "1px solid #ff9d8e",
          [type + "InputErrorMessage"]: passwordCheckObject.message
        });
        return false;
      } else {
        if (this.state.password !== this.state.confirmPassword) {
          this.setState({
            [type + "InputBorder"]: "1px solid #ff9d8e",
            [type +
            "InputErrorMessage"]: "confirm password and password is not the same"
          });
          return false;
        }
      }
      return true;
    }
  };

  createUser = async event => {
    let canCreateUser =
      this.confirmInput("email") &&
      this.confirmInput("password") &&
      this.confirmInput("confirmPassword");
    if (canCreateUser) {
      let data = new FormData();
      let email = this.state.email;
      let password = this.state.password;
      data.append("email", email);
      data.append("password", password);
      let response = await fetch("/signup-user", {
        method: "POST",
        body: data
      });
      let responseBody = await response.text();
      responseBody = JSON.parse(responseBody);

      if (!responseBody.success) {
        this.setState({ signUpErrorMessage: responseBody.message });
        return;
      }
      if (responseBody.success) {
        this.props.dispatch({
          type: "LOGGED_IN",
          loggedIn: responseBody.success,
          user: responseBody.user
        });
        this.props.history.push(this.props.currentPath);
        return;
      }
    }
  };

  render() {
    return (
      <div className="signUpPage-wrapper ">
        <div className="signUpPage-wrapper-overlay">
          <div className="signUpPage-left-section">
            {/* <div className="signUpPage-left-section-contents"> */}
            <Logo type="dark" width="30px" />
            <Gap value="30px" />
            <div>A simple and secure way to rent, buy and sell property.</div>
            <Gap value="30px" />
            <div>Meet verified buyers and tenants.</div>
            <Gap value="30px" />
            <div>
              Join us and discover great ChoicesSpaces around the world.
            </div>

            {/* </div> */}
          </div>
          <div className="signUpPage-right-section">
            <div>Join Us</div>
            <Gap value="30px" />
            <form autoComplete="on">
              <InputBox
                autoComplete="on"
                type="email"
                placeholder="Email"
                height="30px"
                padding="20px"
                border={this.state.emailInputBorder}
                borderRadius="5px"
                fontSize="14px"
                onBlur={() => this.confirmInput("email")}
                onChange={c => this.onChangeInputText("email", c)}
              />
              <div className="signUpForm-error-message">
                {this.state.emailInputErrorMessage}
              </div>
              <Gap value="15px" />
              <InputBox
                autoComplete="on"
                type="password"
                placeholder="Password"
                height="30px"
                padding="20px"
                border={this.state.passwordInputBorder}
                borderRadius="5px"
                fontSize="14px"
                onBlur={() => this.confirmInput("password")}
                onChange={c => this.onChangeInputText("password", c)}
              />
              <div className="signUpForm-error-message">
                {this.state.passwordInputErrorMessage}
              </div>
              <Gap value="15px" />
              <InputBox
                autoComplete="on"
                type="password"
                placeholder="Confirm password"
                height="30px"
                padding="20px"
                border={this.state.confirmPasswordInputBorder}
                borderRadius="5px"
                fontSize="14px"
                onBlur={() => this.confirmInput("confirmPassword")}
                onChange={c => this.onChangeInputText("confirmPassword", c)}
              />
              <div className="signUpForm-error-message">
                {this.state.confirmPasswordInputErrorMessage}
              </div>

              <Gap value="30px" />
              <div className="signUpForm-other-actions-row">
                By creating an account, you agree to ChoiceSpaces{" "}
                <Link to={"/privacy-statement"}>Privacy Policy</Link> and{" "}
                <Link to={"/terms-and-conditions"}>Terms and Conditions</Link>.
              </div>
              <Gap value="15px" />
              <Button
                buttonLabel="CREATE ACCOUNT"
                width="100%"
                height="45px"
                color="#FFFFFF"
                fontSize="16px"
                borderRadius="5px"
                backgroundColor="#FFB800"
                onClick={e => this.createUser(e)}
              />
              <Gap value="30px" />
              <div className="signUpForm-other-actions-row">
                Already created an account? <Link to={"/login"}>Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentPath: state.currentPath
  };
};

let SignUpPage = connect(mapStateToProps)(UnconnectedSignUpPage);
export default withRouter(SignUpPage);
