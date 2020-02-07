import React, { Component } from "react";
import "./PrivacyStatementPage.css";
import { connect } from "react-redux";

export class UnconnectedPrivacyStatementPage extends Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/privacy-statement"
    });
  };

  render() {
    return <div className="privacyStatementPage-wrapper"></div>;
  }
}

let PrivacyStatementPage = connect()(UnconnectedPrivacyStatementPage);
export default PrivacyStatementPage;
