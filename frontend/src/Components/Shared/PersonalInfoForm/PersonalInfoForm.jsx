import React, { Component } from "react";
import "./PersonalInfoForm.css";
import { inputValidator } from "../../../Functions/Validators.js";
import InputBox from "../InputBox/InputBox.jsx";
import Button from "../Button/Button.jsx";
import Gap from "../Gap/Gap.jsx";
import Stepper from "../Stepper/Stepper.jsx";

export class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      firstNameInputBorder: "1px solid #CFD4DD",
      firstNameInputErrorMessage: "",
      lastNameInputBorder: "1px solid #CFD4DD",
      lastNameInputErrorMessage: "",
      phoneNumberInputBorder: "1px solid #CFD4DD",
      phoneNumberInputErrorMessage: "",
      addressInputBorder: "1px solid #CFD4DD",
      addressInputErrorMessage: "",
      zipCodeInputBorder: "1px solid #CFD4DD",
      zipCodeInputErrorMessage: "",
      countryInputBorder: "1px solid #CFD4DD",
      countryInputErrorMessage: "",
      stateInputBorder: "1px solid #CFD4DD",
      stateInputErrorMessage: "",
      cityInputBorder: "1px solid #CFD4DD",
      cityInputErrorMessage: ""
    };
  }

  onChangeInputText = (type, value) => {
    let _formData = { ...this.state.formData, [type]: value };

    this.setState({
      formData: _formData,
      [type + "InputBorder"]: "1px solid #CFD4DD",
      [type + "InputErrorMessage"]: ""
    });
  };

  confirmInput = type => {
    if (type === "firstName" || type === "lastName") {
      let inputCheckObject = inputValidator(this.state.formData[type], 2);
      if (!inputCheckObject.valid) {
        this.setState({
          [type + "InputBorder"]: "1px solid #ff9d8e",
          [type + "InputErrorMessage"]: inputCheckObject.message
        });
        return false;
      }

      return true;
    }

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
      <div className="PersonalInfoForm-Wrapper">
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
        <div className="PersonalInfoForm-row-Wrapper">
          <div className="PersonalInfoForm-row">
            <div style={{ width: "50%" }}>
              <InputBox
                autoComplete="on"
                type="text"
                placeholder="First Name"
                height="35px"
                padding="10px"
                border={this.state.firstNameInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.firstName}
                onBlur={() => this.confirmInput("firstName")}
                onChange={c => this.onChangeInputText("firstName", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.firstNameInputErrorMessage}
              </div>
            </div>
            <Gap value="15px" />
            <div style={{ width: "50%" }}>
              <InputBox
                autoComplete="on"
                type="text"
                placeholder="Last Name"
                height="35px"
                padding="10px"
                border={this.state.lastNameInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.lastName}
                onBlur={() => this.confirmInput("lastName")}
                onChange={c => this.onChangeInputText("lastName", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.lastNameInputErrorMessage}
              </div>
            </div>
          </div>
          <Gap value="15px" />
          <InputBox
            autoComplete="on"
            type="text"
            rows="3"
            cols="50"
            placeholder="Address"
            padding="10px"
            border={this.state.addressInputBorder}
            borderRadius="5px"
            fontSize="14px"
            value={this.state.formData.address}
            onBlur={() => this.confirmInput("address")}
            onChange={c => this.onChangeInputText("address", c)}
          />
          <div className="PersonalInfoForm-error-message">
            {this.state.addressInputErrorMessage}
          </div>
          <Gap value="15px" />
          <div className="PersonalInfoForm-row">
            <div style={{ width: "40%" }}>
              <InputBox
                autoComplete="on"
                type="text"
                placeholder="Zip Code"
                height="35px"
                padding="10px"
                border={this.state.zipCodeInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.zipCode}
                onBlur={() => this.confirmInput("zipCode")}
                onChange={c => this.onChangeInputText("zipCode", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.zipCodeInputErrorMessage}
              </div>
            </div>
            <Gap value="15px" />
            <div style={{ width: "60%" }}>
              <InputBox
                autoComplete="on"
                type="number"
                placeholder="Phone Number"
                height="35px"
                padding="10px"
                border={this.state.phoneNumberInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.phoneNumber}
                onBlur={() => this.confirmInput("phoneNumber")}
                onChange={c => this.onChangeInputText("phoneNumber", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.phoneNumberInputErrorMessage}
              </div>
            </div>
          </div>

          <Gap value="15px" />
          <div>
            <InputBox
              autoComplete="on"
              type="text"
              placeholder="Country"
              height="35px"
              padding="10px"
              border={this.state.countryInputBorder}
              borderRadius="5px"
              fontSize="14px"
              value={this.state.formData.country}
              onBlur={() => this.confirmInput("country")}
              onChange={c => this.onChangeInputText("country", c)}
            />
            <div className="PersonalInfoForm-error-message">
              {this.state.countryInputErrorMessage}
            </div>
          </div>
          <Gap value="15px" />
          <div className="PersonalInfoForm-row">
            <div style={{ width: "50%" }}>
              <InputBox
                autoComplete="on"
                type="text"
                placeholder="State"
                height="35px"
                padding="10px"
                border={this.state.stateInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.state}
                onBlur={() => this.confirmInput("state")}
                onChange={c => this.onChangeInputText("state", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.stateInputErrorMessage}
              </div>
            </div>
            <Gap value="15px" />
            <div style={{ width: "50%" }}>
              <InputBox
                autoComplete="on"
                type="text"
                placeholder="City"
                height="35px"
                padding="10px"
                border={this.state.cityInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.city}
                onBlur={() => this.confirmInput("city")}
                onChange={c => this.onChangeInputText("city", c)}
              />
              <div className="PersonalInfoForm-error-message">
                {this.state.cityInputErrorMessage}
              </div>
            </div>
          </div>

          <Gap value="30px" />

          <div className="PersonalInfoForm-row">
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
                buttonLabel="NEXT"
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

export default PersonalInfoForm;
