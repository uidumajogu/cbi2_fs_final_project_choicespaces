import React, { Component } from "react";

export class CheckBox extends Component {
  handleCheckBox = evt => {
    this.props.onClick(evt.target.checked);
  };
  render() {
    return (
      <div>
        <input
          className="checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          onClick={this.handleCheckBox}
        />
        {this.props.label}
      </div>
    );
  }
}

export default CheckBox;
