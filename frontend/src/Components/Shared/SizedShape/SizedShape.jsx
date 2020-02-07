import React, { Component } from "react";
import "./SizedShape.css";

export class SizedShape extends Component {
  sizedShapeStyle = {
    width: this.props.width,
    height: this.props.height,
    borderRadius: this.props.borderRadius,
    backgroundColor: this.props.backgroundColor
  };
  render() {
    return <div style={this.sizedShapeStyle}></div>;
  }
}

export default SizedShape;
