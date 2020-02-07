import React, { Component } from "react";

export class Gap extends Component {
  render() {
    return (
      <div style={{ width: this.props.value, height: this.props.value }}></div>
    );
  }
}

export default Gap;
