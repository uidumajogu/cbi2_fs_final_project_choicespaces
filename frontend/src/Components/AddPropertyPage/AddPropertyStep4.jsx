import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Button from "../Shared/Button/Button.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import SelectBox from "../Shared/SelectBox/SelectBox.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";

let propertyStatusList = [
  {
    title: "Yes",
    value: "yes"
  },
  {
    title: "No",
    value: "no"
  }
];

export class AddPropertyStep4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPropertyData: this.props.addPropertyData,
      enterDescription: false
    };
  }

  componentDidMount = () => {
    this.setState({ addPropertyData: this.props.addPropertyData });
  };

  submitSelect = (type, value) => {
    if (type === "propertyStatus") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        status: value.value
      };
      this.setState({
        addPropertyData: _addPropertyData,
        enterDescription: true
      });

      return;
    }

    if (type === "setTitle") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        title: value
      };
      this.setState({
        addPropertyData: _addPropertyData
      });

      return;
    }

    if (type === "setDescription") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        description: value
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
          <h2>Is this a new property?</h2>
          <Gap value="5px" />

          <div className="addProperty-right-box">
            <SelectBox
              selectBoxes={propertyStatusList}
              activeColor="#FFB800"
              selectedValue={this.props.addPropertyData.status}
              onSelect={v => this.submitSelect("propertyStatus", v)}
            />
          </div>

          {this.state.enterDescription && (
            <div>
              <div>
                <Gap value="30px" />
                <h2>Title</h2>
                <Gap value="5px" />
                <InputBox
                  autoComplete="on"
                  type="text"
                  placeholder="An astonishing place"
                  height="30px"
                  padding="20px"
                  border="1px solid #CFD4DD"
                  borderRadius="5px"
                  fontSize="20px"
                  value={this.props.addPropertyData.title}
                  // onBlur={() => this.confirmInput("email")}
                  onChange={v => this.submitSelect("setTitle", v)}
                />
              </div>

              <div>
                <Gap value="30px" />
                <h2>Description</h2>
                <Gap value="5px" />
                <InputBox
                  rows="6"
                  cols="10"
                  autoComplete="on"
                  type="text"
                  placeholder=""
                  padding="10px"
                  border="1px solid #CFD4DD"
                  borderRadius="5px"
                  fontSize="20px"
                  value={this.props.addPropertyData.description}
                  // onBlur={() => this.confirmInput("email")}
                  onChange={v => this.submitSelect("setDescription", v)}
                />
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

export default AddPropertyStep4;
