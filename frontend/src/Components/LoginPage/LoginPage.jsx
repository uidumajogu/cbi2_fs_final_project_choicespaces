import React, { Component } from "react";
import "./LoginPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Logo from "../Shared/Logo/Logo.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";
import {
  emailValidator,
  passwordValidator
} from "../../Functions/Validators.js";
import { Link } from "react-router-dom";
import CheckBox from "../Shared/CheckBox/CheckBox.jsx";
import Button from "../Shared/Button/Button.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class UnconnectedLoginPage extends Component {
  constructor() {
    super();
    this.state = {
      emailInputBorder: "1px solid #CFD4DD",
      passwordInputBorder: "1px solid #CFD4DD",
      email: "",
      password: "",
      inputText: "",
      emailInputErrorMessage: "",
      passwordInputErrorMessage: "",
      keepUserLoggedIn: false,
      signInErrorMessage: ""
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
  };

  handleCheckBox = value => {
    this.setState({ keepUserLoggedIn: value });
  };

  loginUser = async event => {
    let canLoginUser =
      this.confirmInput("email") && this.confirmInput("password");

    if (canLoginUser) {
      console.log("here1");
      let data = new FormData();
      let email = this.state.email;
      let password = this.state.password;
      data.append("email", email);
      data.append("password", password);
      let response = await fetch("/login-user", {
        method: "POST",
        body: data
      });
      let responseBody = await response.text();
      responseBody = JSON.parse(responseBody);

      if (!responseBody.success) {
        this.setState({ signInErrorMessage: responseBody.message });
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
      <div className="loginPage-wrapper">
        <div className="loginForm-wrapper">
          <Logo type="dark" width="30px" />

          <Gap value="30px" />
          <div>Login to a world of ChoiceSpaces</div>
          <Gap value="30px" />
          <form autoComplete="on">
            <InputBox
              autoComplete="on"
              type="email"
              placeholder="Email"
              height="30px"
              padding="20px 20px"
              border={this.state.emailInputBorder}
              borderRadius="5px"
              fontSize="14px"
              onBlur={() => this.confirmInput("email")}
              onChange={c => this.onChangeInputText("email", c)}
            />
            <div className="loginForm-error-message">
              {this.state.emailInputErrorMessage}
            </div>
            <Gap value="15px" />
            <InputBox
              autoComplete="on"
              type="password"
              placeholder="Password"
              height="30px"
              padding="20px 20px"
              border={this.state.passwordInputBorder}
              borderRadius="5px"
              fontSize="14px"
              onBlur={() => this.confirmInput("password")}
              onChange={c => this.onChangeInputText("password", c)}
            />
            <div className="loginForm-error-message">
              {this.state.passwordInputErrorMessage}
            </div>
            <Gap value="15px" />
            <div className="loginForm-password-action-row">
              <CheckBox
                label="Keep me logged in"
                onClick={v => this.handleCheckBox(v)}
              />
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </div>
            <Gap value="30px" />
            <div className="loginForm-other-actions-row">
              By logging in, you agree to ChoiceSpaces{" "}
              <Link to={"/privacy-statement"}>Privacy Policy</Link> and{" "}
              <Link to={"/terms-and-conditions"}>Terms and Conditions</Link>.
            </div>
            <Gap value="15px" />
            <Button
              buttonLabel="LOG IN"
              width="100%"
              height="45px"
              color="#FFFFFF"
              fontSize="16px"
              borderRadius="5px"
              backgroundColor="#FFB800"
              onClick={e => this.loginUser(e)}
            />
            <Gap value="30px" />
            <div className="loginForm-other-actions-row">
              No account? <Link to={"/sign-up"}>Sign up now</Link>
            </div>
          </form>
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

let LoginPage = connect(mapStateToProps)(UnconnectedLoginPage);
export default withRouter(LoginPage);
