import React, { Component } from "react";
import "./VendorProfilePageBankInfoForm.css";
import { inputValidator } from "../../../Functions/Validators.js";
import InputBox from "../../Shared/InputBox/InputBox.jsx";
import Button from "../../Shared/Button/Button.jsx";
import Gap from "../../Shared/Gap/Gap.jsx";
import Stepper from "../../Shared/Stepper/Stepper.jsx";

export class VendorProfilePageBankInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      accountNameInputBorder: "1px solid #CFD4DD",
      accountNameInputErrorMessage: "",
      accountNumberInputBorder: "1px solid #CFD4DD",
      accountNumberInputErrorMessage: "",
      bankNameInputBorder: "1px solid #CFD4DD",
      bankNameInputErrorMessage: "",
      routingNumberInputBorder: "1px solid #CFD4DD",
      routingNumberErrorMessage: ""
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
      <div className="vendorProfilePageBankInfoForm-Wrapper">
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
        <div className="vendorProfilePageBankInfoForm-row-Wrapper">
          <InputBox
            autoComplete="on"
            type="name"
            placeholder="Account Name"
            height="35px"
            padding="10px"
            border={this.state.accountNameInputBorder}
            borderRadius="5px"
            fontSize="14px"
            value={this.state.formData.accountName}
            onBlur={() => this.confirmInput("accountName")}
            onChange={c => this.onChangeInputText("accountName", c)}
          />
          <div className="vendorProfilePageBankInfoForm-error-message">
            {this.state.accountNameInputErrorMessage}
          </div>
          <Gap value="15px" />
          <div className="vendorProfilePageBankInfoForm-row">
            <div style={{ width: "40%" }}>
              <InputBox
                autoComplete="on"
                type="number"
                placeholder="Routing Number"
                height="35px"
                padding="10px"
                border={this.state.routingNumberInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.routingNumber}
                onBlur={() => this.confirmInput("routingNumber")}
                onChange={c => this.onChangeInputText("routingNumber", c)}
              />
              <div className="vendorProfilePagePersonalInfoForm-error-message">
                {this.state.routingNumberInputErrorMessage}
              </div>
            </div>
            <Gap value="15px" />
            <div style={{ width: "55%" }}>
              <InputBox
                autoComplete="on"
                type="number"
                placeholder="Account Number"
                height="35px"
                padding="10px"
                border={this.state.accountNumberInputBorder}
                borderRadius="5px"
                fontSize="14px"
                value={this.state.formData.accountNumber}
                onBlur={() => this.confirmInput("accountNumber")}
                onChange={c => this.onChangeInputText("accountNumber", c)}
              />
              <div className="vendorProfilePagePersonalInfoForm-error-message">
                {this.state.accountNumberInputErrorMessage}
              </div>
            </div>
          </div>

          <Gap value="15px" />

          <InputBox
            autoComplete="on"
            type="text"
            placeholder="Bank Name"
            height="35px"
            padding="10px"
            border={this.state.bankNameInputBorder}
            borderRadius="5px"
            fontSize="14px"
            value={this.state.formData.bankName}
            onBlur={() => this.confirmInput("bankName")}
            onChange={c => this.onChangeInputText("bankName", c)}
          />
          <div className="vendorProfilePageBankInfoForm-error-message">
            {this.state.bankNameInputErrorMessage}
          </div>

          <Gap value="30px" />

          <div className="vendorProfilePageBankInfoForm-row">
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

export default VendorProfilePageBankInfoForm;
