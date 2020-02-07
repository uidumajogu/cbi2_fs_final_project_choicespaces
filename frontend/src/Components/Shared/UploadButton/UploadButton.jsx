import React, { Component } from "react";
import "./UploadButton.css";

export class UploadButton extends Component {
  UploadButtonStyle = {
    border: this.props.border ? this.props.border : "2px solid CFD4DD",
    color: this.props.color ? this.props.color : "#CFD4DD",
    backgroundColor: this.props.backgroundColor
      ? this.props.backgroundColor
      : "#FFFFFF",
    padding: this.props.padding ? this.props.padding : "10px",
    borderRadius: this.props.borderRadius ? this.props.borderRadius : "5px",
    fontSize: this.props.fontSize ? this.props.fontSize : "14px",
    fontWeight: this.props.fontWeight ? this.props.fontWeight : "normal"
  };

  render() {
    return (
      <div className="upload-btn-wrapper">
        <button style={this.UploadButtonStyle}>
          {this.props.title ? this.props.title : "Browse"}
        </button>
        {this.props.multiple ? (
          <input type="file" onChange={this.props.uploadFile} multiple />
        ) : (
          <input type="file" onChange={this.props.uploadFile} />
        )}
      </div>
    );
  }
}

export default UploadButton;
