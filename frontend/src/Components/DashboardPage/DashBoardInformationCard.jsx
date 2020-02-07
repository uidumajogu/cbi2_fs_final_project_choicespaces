import React, { Component } from "react";
import "./DashboardPage.css";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import Gap from "../Shared/Gap/Gap.jsx";

export class DashBoardInformationCard extends Component {
  dashBoardInformationCardStyle = {
    width: this.props.width,
    height: this.props.height,
    background: "#FFFFFF",
    border: "1px solid #DDE0E7",
    borderRadius: "5px",
    padding: "20px",
    color: "#6E7189"
  };
  render() {
    return (
      <div style={this.dashBoardInformationCardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "20%"
          }}
        >
          <SizedShape
            backgroundColor="#E2F1FE"
            width="30px"
            height="30px"
            borderRadius="100px"
          />
          <Gap value="10px" />
          <h5>{this.props.title}</h5>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            height: "80%",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#21528d"
          }}
        >
          {this.props.description}
        </div>
      </div>
    );
  }
}

export default DashBoardInformationCard;
