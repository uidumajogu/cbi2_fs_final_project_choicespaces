import React, { Component } from "react";
import "./NavBar.css";
import Button from "../Button/Button.jsx";
import Logo from "../Logo/Logo.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export class UnconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  goToPage = pageLink => {
    this.props.history.push(pageLink);
  };

  navBarStyle = {
    borderBottom: this.props.borderBottom
      ? this.props.borderBottom
      : "1px solid #cfd4dd",
    backgroundColor: this.props.backgroundColor
      ? this.props.backgroundColor
      : "#f3f4fb",
    position: this.props.fixed ? "fixed" : null,
    top: this.props.fixed ? "0" : null
  };

  showLogout = () => {
    console.log("nnnn");
    let _logout = this.state.logout;
    this.setState({ logout: !_logout });
  };

  logoutUser = async () => {
    this.showLogout();
    let response = await fetch("/logout");
    let responseBody = await response.text();

    responseBody = JSON.parse(responseBody);

    if (responseBody.success) {
      this.props.dispatch({
        type: "LOGOUT"
      });

      this.props.history.push("/");
      window.location.reload(false);
    } else {
      alert("Something went wrong, try again!");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="navbar-row" style={this.navBarStyle}>
          {this.props.logoType === "light" ? (
            <Logo type="light" width="30px" />
          ) : (
            <Logo type="dark" width="30px" />
          )}

          <div className="navbar-buttons">
            {this.props.home && (
              <Button
                buttonLabel="Home"
                height="30px"
                color="#21528D"
                fontSize="14px"
                borderRadius="20px"
                // border="1px solid #21528D"
                // margin="0 10px"
                padding="0 20px"
                fontWeight="normal"
                backgroundColor="transparent"
                onClick={() => this.goToPage("/")}
              />
            )}

            {!this.props.loggedIn && (
              <Button
                buttonLabel="Log in"
                height="30px"
                color="#21528D"
                fontSize="14px"
                padding="0 20px"
                fontWeight="normal"
                onClick={() => this.goToPage("/login")}
              />
            )}
            {!this.props.loggedIn && (
              <Button
                buttonLabel="Sign Up"
                height="30px"
                color="#242648"
                fontSize="14px"
                borderRadius="20px"
                border="1px solid #21528D"
                padding="0 20px"
                margin="0 20px"
                fontWeight="normal"
                backgroundColor="transparent"
                onClick={() => this.goToPage("/sign-up")}
              />
            )}

            {this.props.loggedIn &&
              this.props.user.userType === "vendor" &&
              (!(this.props.dashboard === undefined)
                ? this.props.dashboard
                : true) && (
                <Button
                  buttonLabel="Dashboard"
                  height="30px"
                  color="#21528D"
                  fontSize="14px"
                  borderRadius="20px"
                  border="1px solid #21528D"
                  margin="0 20px"
                  padding="0 20px"
                  fontWeight="normal"
                  backgroundColor="transparent"
                  suffixIcon="../assets/icons/analytics.svg"
                  suffixIconWidth="22px"
                  suffixIconPadding="5px"
                  objectFit="none"
                  onClick={() => this.goToPage("/dashboard")}
                />
              )}

            {this.props.addProperty && (
              <Button
                buttonLabel="Add Property"
                height="32px"
                color="#FFFFFF"
                fontSize="14px"
                borderRadius="20px"
                margin="0 20px"
                padding="0 20px"
                backgroundColor="#FFB800"
                suffixIcon="../assets/icons/add_list_icon.svg"
                suffixIconWidth="22px"
                suffixIconPadding="5px"
                onClick={() => this.goToPage("/add-property")}
              />
            )}

            {this.props.loggedIn && (
              <Button
                // width="35px"
                height="35px"
                borderRadius="100px"
                margin="0 50px"
                backgroundColor="#21528D"
                suffixIcon={
                  this.props.user.profileImageURL === null
                    ? "../assets/icons/user_light.svg"
                    : this.props.user.profileImageURL
                }
                suffixIconWidth="35px"
                imageBorderRadius="50%"
                onClick={this.showLogout}
              />
            )}
          </div>
        </div>
        {this.state.logout && (
          <div className="navbar-logout-modal">
            <button onClick={() => this.goToPage("/myProfile")}>
              My Profile
            </button>
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
    currentPage: state.currentPage
  };
};

let NavBar = connect(mapStateToProps)(UnconnectedNavBar);
export default withRouter(NavBar);
