import React, { Component } from "react";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import "./AddPropertyPage.css";

export class AddPropertyPreview extends Component {
  render() {
    return (
      <div className="addPropertyPage-preview-wrapper">
        <div className="addPropertyPage-preview-title">
          <SizedShape
            width="10px"
            height="10px"
            backgroundColor="#21528d"
            borderRadius="100px"
          />
          <h5>{this.props.title}</h5>
        </div>

        <div className="addPropertyPage-preview-description">
          {this.props.description}
        </div>
      </div>
    );
  }
}

export default AddPropertyPreview;
