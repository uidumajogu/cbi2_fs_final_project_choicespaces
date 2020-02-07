import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";
import Button from "../Shared/Button/Button.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";

export class AddPropertyStep5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPropertyData: this.props.addPropertyData
    };
  }

  componentDidMount = () => {
    this.setState({ addPropertyData: this.props.addPropertyData });
  };

  submitSelect = (type, value) => {
    if (type === "setCountry") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        country: value
      };
      this.setState({
        addPropertyData: _addPropertyData
      });

      return;
    }

    if (type === "setState") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        state: value
      };
      this.setState({
        addPropertyData: _addPropertyData
      });

      return;
    }

    if (type === "setCity") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        city: value
      };
      this.setState({
        addPropertyData: _addPropertyData
      });

      return;
    }

    if (type === "setZipCode") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        zipCode: value
      };
      this.setState({
        addPropertyData: _addPropertyData
      });

      return;
    }

    if (type === "setAddress") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        address: value
      };
      this.setState({
        addPropertyData: _addPropertyData
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
          <h2>Where is the property located?</h2>
          <Gap value="10px" />

          <InputBox
            autoComplete="on"
            type="text"
            placeholder="Country"
            height="30px"
            padding="20px"
            border="1px solid #CFD4DD"
            borderRadius="5px"
            fontSize="20px"
            value={this.props.addPropertyData.country}
            // onBlur={() => this.confirmInput("email")}
            onChange={v => this.submitSelect("setCountry", v)}
          />

          <Gap value="5px" />

          <InputBox
            autoComplete="on"
            type="text"
            placeholder="State"
            height="30px"
            padding="20px"
            border="1px solid #CFD4DD"
            borderRadius="5px"
            fontSize="18px"
            value={this.props.addPropertyData.state}
            // onBlur={() => this.confirmInput("email")}
            onChange={v => this.submitSelect("setState", v)}
          />

          <Gap value="5px" />
          <div className="addProperty-right-box-button">
            <InputBox
              autoComplete="on"
              type="text"
              placeholder="City"
              height="30px"
              padding="20px"
              border="1px solid #CFD4DD"
              borderRadius="5px"
              fontSize="18px"
              value={this.props.addPropertyData.city}
              // onBlur={() => this.confirmInput("email")}
              onChange={v => this.submitSelect("setCity", v)}
            />
            <Gap value="5px" />
            <InputBox
              autoComplete="on"
              type="text"
              placeholder="Zip Code"
              height="30px"
              width="35%"
              padding="20px"
              border="1px solid #CFD4DD"
              borderRadius="5px"
              fontSize="18px"
              value={this.props.addPropertyData.zipCode}
              // onBlur={() => this.confirmInput("email")}
              onChange={v => this.submitSelect("setZipCode", v)}
            />
          </div>
          <Gap value="5px" />
          <InputBox
            rows="6"
            cols="4"
            autoComplete="on"
            type="text"
            placeholder="Address"
            padding="10px"
            border="1px solid #CFD4DD"
            borderRadius="5px"
            fontSize="18px"
            value={this.props.addPropertyData.address}
            // onBlur={() => this.confirmInput("email")}
            onChange={v => this.submitSelect("setAddress", v)}
          />

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

export default AddPropertyStep5;
