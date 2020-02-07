import React, { Component } from "react";
import "./TermsAndConditionsPage.css";
import { connect } from "react-redux";

export class UnconnectedTermsAndConditionsPage extends Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/terms-and-conditions"
    });
  };
  render() {
    return <div className="termsAndConditionsPage-wrapper"></div>;
  }
}

let TermsAndConditionsPage = connect()(UnconnectedTermsAndConditionsPage);
export default TermsAndConditionsPage;
