import React, { Component } from "react";
import "./ProfileImageUpload.css";
import { inputValidator } from "../../../Functions/Validators.js";
import InputBox from "../InputBox/InputBox.jsx";
import Button from "../Button/Button.jsx";
import Gap from "../Gap/Gap.jsx";
import Stepper from "../Stepper/Stepper.jsx";

export class ProfileImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      imageFileInputBorder: "1px solid #CFD4DD",
      imageFileInputErrorMessage: ""
    };
  }

  onChangeInputText = (type, event) => {
    let _formData = { ...this.state.formData, [type]: event.target.files[0] };
    this.setState({
      formData: _formData,
      [type + "InputBorder"]: "1px solid #CFD4DD",
      [type + "InputErrorMessage"]: ""
    });
  };

  confirmInput = type => {
    let inputCheckObject = inputValidator(this.state.formData[type], 2);
    if (!inputCheckObject.valid) {
      this.setState({
        [type + "InputBorder"]: "1px solid #ff9d8e",
        [type + "InputErrorMessage"]: inputCheckObject.message
      });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="ProfileImageUpload-Wrapper">
        <div>
          {this.props.stepperData.map(step => {
            return (
              <Stepper
                key={step.index}
                index={step.index}
                activeIndex={this.props.step}
                title={step.title}
                description={step.description}
                totalSteps={this.props.stepperData.length}
                divider={
                  step !==
                  this.props.stepperData[this.props.stepperData.length - 1]
                }
                activeColor="#21528d"
                inActiveColor="#A1ABBD"
              />
            );
          })}
        </div>
        <div className="ProfileImageUpload-row-Wrapper">
          <InputBox
            autoComplete="on"
            type="file"
            placeholder="Upload Image"
            height="35px"
            padding="10px"
            border={this.state.imageFileInputBorder}
            borderRadius="5px"
            fontSize="14px"
            // value={this.state.formData.imageFile}
            onBlur={() => this.confirmInput("imageFile")}
            onChange={c => this.onChangeInputText("imageFile", c)}
          />
          <div className="ProfileImageUpload-error-message">
            {this.state.imageFileInputErrorMessage}
          </div>
          <Gap value="15px" />
          <div className="ProfileImageUpload-image-box">
            {this.state.formData["imageFile"] !== "" ? (
              <img
                src={URL.createObjectURL(this.state.formData["imageFile"])}
                alt="Profile Avatar"
              />
            ) : (
              <img src="../assets/icons/user_light.svg" alt="Profile Avatar" />
            )}
          </div>

          <Gap value="30px" />

          <div className="ProfileImageUpload-row">
            <div style={{ width: "30%" }}>
              <Button
                buttonLabel="Back"
                width="100%"
                height="35px"
                color="#21528d"
                fontSize="16px"
                borderRadius="5px"
                backgroundColor="transparent"
                onClick={() => this.props.previousForm(this.state.formData)}
              />
            </div>
            <Gap value="15px" />
            <div style={{ width: "50%" }}>
              <Button
                buttonLabel="SUBMIT"
                width="100%"
                height="35px"
                color="#FFFFFF"
                fontSize="16px"
                borderRadius="5px"
                backgroundColor="#FFB800"
                onClick={() => this.props.nextForm(this.state.formData)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileImageUpload;
