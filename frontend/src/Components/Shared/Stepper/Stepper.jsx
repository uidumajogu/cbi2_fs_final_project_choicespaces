import React, { Component } from "react";
import "./Stepper.css";
import SizedShape from "../SizedShape/SizedShape.jsx";
import Gap from "../Gap/Gap.jsx";

export class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.activeIndex
    };
  }

  stepperStyle = {
    color:
      this.props.index <= this.props.activeIndex
        ? this.props.activeColor
        : this.props.inActiveColor
  };

  render() {
    return (
      <div className="stepper-wrapper">
        <div className="stepper-milestone-header">
          <SizedShape
            width="20px"
            height="20px"
            borderRadius="100px"
            backgroundColor={
              this.props.index <= this.props.activeIndex
                ? this.props.activeColor
                : this.props.inActiveColor
            }
          />
          <h5 style={this.stepperStyle}>Step {this.props.index + 1}</h5>
        </div>
        <div className="stepper-milestone-details">
          {this.props.divider && (
            <SizedShape
              width="2px"
              height="100px"
              backgroundColor={
                this.props.index < this.props.activeIndex
                  ? this.props.activeColor
                  : this.props.inActiveColor
              }
            />
          )}

          <div style={this.stepperStyle}>
            <h3>{this.props.title}</h3>
            <Gap value="5px" />
            <p>{this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Stepper;
