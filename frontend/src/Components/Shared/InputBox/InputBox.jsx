import React, { Component } from "react";
import "./InputBox.css";

export class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      onInputErrorMessage: ""
    };
  }

  handleEnteredInput = event => {
    this.props.onChange(event.target.value);
  };

  inputBoxStyle = {
    width: this.props.width ? this.props.width : "100%",
    height: this.props.height,
    margin: this.props.margin ? this.props.margin : "0",
    padding: this.props.padding,
    color: this.props.color,
    border: this.props.border ? this.props.border : "none",
    borderRadius: this.props.borderRadius,
    fontSize: this.props.fontSize
  };

  render() {
    return this.props.rows ? (
      <textarea
        style={{
          ...this.inputBoxStyle,
          border: this.props.border
        }}
        className="inputBox"
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
        type={this.props.type}
        onChange={this.handleEnteredInput}
        onBlur={this.props.onBlur}
        autoComplete={this.props.autoComplete}
        rows={this.props.rows}
        cols={this.props.cols}
      />
    ) : (
      <input
        style={{
          ...this.inputBoxStyle,
          border: this.props.border
        }}
        className="inputBox"
        defaultValue={this.props.value ? this.props.value : ""}
        placeholder={this.props.placeholder}
        type={this.props.type}
        onChange={this.handleEnteredInput}
        onBlur={this.props.onBlur}
        autoComplete={this.props.autoComplete}
        size={this.props.size}
      />
    );
  }
}

export default InputBox;
