import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Logo extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.type === "dark" && (
          <Link to={"/"}>
            <img
              width={this.props.width}
              src="../assets/logo/logo_dark.png"
              alt="Logo"
            />
          </Link>
        )}{" "}
        {this.props.type === "light" && (
          <Link to={"/"}>
            <img
              width={this.props.width}
              src="../assets/logo/logo_light.png"
              alt="Logo"
            />
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default Logo;
