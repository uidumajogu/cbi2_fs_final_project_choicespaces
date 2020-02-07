import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Button from "../Shared/Button/Button.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import SelectBox from "../Shared/SelectBox/SelectBox.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";

let propertyLeaseTypeList = [
  {
    title: "For Sale",
    value: "sale"
  },
  {
    title: "For Rent",
    value: "rent"
  }
];

let paymentInterval = [
  {
    title: "Daily",
    value: "day",
    mrp: "1"
  },
  {
    title: "Weekly",
    value: "week",
    mrp: "1"
  },
  {
    title: "Monthly",
    value: "month",
    mrp: "1"
  },
  {
    title: "Annual",
    value: "year",
    mrp: "1"
  },
  {
    title: "Bi-Annual",
    value: "bi-annual",
    mrp: "2"
  }
];

export class AddPropertyStep3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyLeaseType: "",
      paymentInterval: "",
      addPropertyData: this.props.addPropertyData,
      isForRent: false,
      setPrice: "",
      minimumRentalPeriod: false,
      minimumRentalPeriodValue: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      propertyLeaseType: this.props.addPropertyData.propertyLeaseType,
      minimumRentalPeriodValue: this.props.addPropertyData.minimumRentalPeriod,
      paymentInterval: this.props.addPropertyData.paymentInterval
    });
  };

  submitSelect = (type, value) => {
    if (type === "propertyLeaseType") {
      let _isForRent = this.state.isForRent;

      let _addPropertyData = {
        ...this.state.addPropertyData,
        propertyLeaseType: value.title
      };
      this.setState({
        addPropertyData: _addPropertyData,
        propertyLeaseType: value.title,
        isForRent:
          type === "propertyLeaseType"
            ? value.title === "For Rent"
              ? true
              : false
            : _isForRent,
        setPrice: value.title === "For Sale" ? true : false,
        minimumRentalPeriod: false
      });

      return;
    }

    if (type === "paymentInterval") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        paymentInterval: value.value
      };
      this.setState({
        addPropertyData: _addPropertyData,
        paymentInterval: value.value,
        setPrice: true
      });

      return;
    }

    if (type === "setPrice") {
      let _propertyLeaseType = this.state.propertyLeaseType;

      let _addPropertyData = {
        ...this.state.addPropertyData,
        price: value
      };
      this.setState({
        addPropertyData: _addPropertyData,
        minimumRentalPeriod: _propertyLeaseType === "For Sale" ? false : true
      });

      return;
    }

    if (type === "setMinimumRentalPeriod") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        minimumRentalPeriod: value
      };
      this.setState({
        addPropertyData: _addPropertyData,
        minimumRentalPeriodValue: value
      });

      return;
    }
  };

  submitData = data => {
    this.props.submitData(data);
  };
  render() {
    return (
      <div className="addPropertyPage-wrapper">
        <div>
          <Gap value="20px" />
          <h4>{this.props.title}</h4>
          <Gap value="5px" />
          <p>{this.props.description}</p>
        </div>
        <Gap value="150px" />
        <div>
          <Gap value="30px" />
          <h2>Is property for sale or rent?</h2>
          <Gap value="5px" />

          <div className="addProperty-right-box">
            <SelectBox
              selectBoxes={propertyLeaseTypeList}
              activeColor="#3A78FF"
              selectedValue={this.props.addPropertyData.propertyLeaseType}
              onSelect={v => this.submitSelect("propertyLeaseType", v)}
            />
          </div>

          {this.state.isForRent && (
            <div>
              <Gap value="30px" />
              <h2>Whats the payment interval?</h2>
              <Gap value="5px" />
              <div className="addProperty-right-box">
                <SelectBox
                  selectBoxes={paymentInterval}
                  activeColor="#3A78FF"
                  selectedValue={this.props.addPropertyData.paymentInterval}
                  onSelect={v => this.submitSelect("paymentInterval", v)}
                />
              </div>
            </div>
          )}

          {this.state.setPrice && (
            <div>
              <Gap value="30px" />
              <h2>Enter the price.</h2>
              <Gap value="5px" />
              <InputBox
                autoComplete="on"
                type="number"
                placeholder=""
                height="30px"
                padding="20px"
                border="1px solid #CFD4DD"
                borderRadius="5px"
                fontSize="20px"
                value={this.props.addPropertyData.price}
                // onBlur={() => this.confirmInput("email")}
                onChange={v => this.submitSelect("setPrice", v)}
              />
            </div>
          )}

          {this.state.minimumRentalPeriod && (
            <div>
              <Gap value="30px" />
              <h2>Minimum Rental Period: </h2>
              <Gap value="5px" />
              <div className="addProperty-interval-box">
                <InputBox
                  autoComplete="on"
                  type="number"
                  placeholder=""
                  height="30px"
                  width="100px"
                  padding="20px"
                  border="1px solid #CFD4DD"
                  borderRadius="5px"
                  fontSize="20px"
                  value={this.props.addPropertyData.minimumRentalPeriod}
                  // onBlur={() => this.confirmInput("email")}
                  onChange={v => this.submitSelect("setMinimumRentalPeriod", v)}
                />
                <Gap value="5px" />
                <p>
                  {this.state.paymentInterval === "bi-annual"
                    ? parseInt(this.state.minimumRentalPeriodValue) > 1
                      ? "YEARS"
                      : "YEAR"
                    : parseInt(this.state.minimumRentalPeriodValue) > 1
                    ? this.state.paymentInterval.toUpperCase() + "S"
                    : this.state.paymentInterval.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          <Gap value="20px" />
          <SizedShape width="100%" height="1px" backgroundColor="#CFD4DD" />
          <Gap value="10px" />
          <div className="addProperty-right-box-button">
            <div></div>
            <Button
              buttonLabel="NEXT"
              width="30%"
              height="45px"
              color="#FFFFFF"
              fontSize="16px"
              borderRadius="5px"
              backgroundColor="#21528D"
              onClick={() => this.submitData(this.state.addPropertyData)}
            />
          </div>
          <Gap value="30px" />
        </div>
      </div>
    );
  }
}

export default AddPropertyStep3;
