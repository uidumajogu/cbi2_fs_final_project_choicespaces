import React, { Component } from "react";
import "./AddPropertyPage.css";
import SelectBox from "../Shared/SelectBox/SelectBox.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import InputBox from "../Shared/InputBox/InputBox.jsx";
import Button from "../Shared/Button/Button.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";

let propertyList = [
  {
    title: "A House",
    value: "house",
    type: [
      { title: "House", value: "house" },
      { title: "Bungalow", value: "bungalow" },
      { title: "Duplex", value: "duplex" },
      { title: "Terrace House", value: "terrace" },
      { title: "Villa", value: "villa" },
      { title: "Mansion", value: "mansion" },
      { title: "Cottage", value: "cottage" },
      { title: "Farm House", value: "farm-house" },
      { title: "Flat", value: "flat" },
      { title: "Chalet", value: "chalet" }
    ],
    details: "How many bedroom?"
  },
  {
    title: "An Apartment",
    value: "apartment",
    type: [
      { title: "Apartment", value: "apartment" },
      { title: "Condominium", value: "condominium" },
      { title: "Loft", value: "loft" },
      { title: "BQ", value: "bq" }
    ],
    details: "How many bedroom?"
  },
  {
    title: "A Hotel",
    value: "hotel",
    type: [
      { title: "Full Service Hotel", value: "fs-hotel" },
      { title: "Extended Stay Hotel", value: "es-hotel" },
      { title: "Motel", value: "motel" },
      { title: "Boutique Hotel", value: "bt-hotel" },
      { title: "Casino", value: "casino" },
      { title: "Resort", value: "resort" }
    ],
    details: "Type of room?"
  }
  //   {
  //     title: "An Office Space",
  //     value: "office",
  //     type: [
  //       { title: "Low-rise", value: "low-rise" },
  //       { title: "Mid-rise", value: "mid-rise" },
  //       { title: "High-rise", value: "high-rise" }
  //     ],
  //     details: "How many bedroom?"
  //   }
];

export class AddPropertyStep1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyObject: {},
      propertyType: false,
      propertyTypeList: [],
      propertyDetails: false,
      propertyDetailsText: "",
      addPropertyData: this.props.addPropertyData
    };
  }

  componentDidMount = () => {
    propertyList.forEach(item => {
      if (this.props.addPropertyData.property === item.title) {
        this.setState({
          propertyTypeList: item.type,
          propertyDetailsText: item.details,
          propertyType: this.props.addPropertyData.propertyType !== "",
          propertyDetails: this.props.addPropertyData.roomDetails !== ""
        });
        return;
      }
    });
  };

  submitSelect = (type, value) => {
    if (type === "property") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        property: value.title
      };

      this.setState({
        propertyObject: value,
        propertyTypeList: value.type,
        propertyType: true,
        propertyDetails: this.state.propertyObject !== value ? false : true,
        propertyDetailsText: value.details,
        addPropertyData: _addPropertyData
      });
    }
    if (type === "propertyType") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        propertyType: value.title
      };

      this.setState({
        propertyDetails: true,
        propertyDetailsText: this.state.propertyObject.details,
        addPropertyData: _addPropertyData
      });
    }

    if (type === "propertyTypeDetails") {
      let _addPropertyData = {
        ...this.state.addPropertyData,
        roomDetails: value
      };

      this.setState({
        addPropertyData: _addPropertyData
      });
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
          <h2>What property are you listing?</h2>
          <Gap value="5px" />

          <div className="addProperty-right-box">
            <SelectBox
              selectBoxes={propertyList}
              activeColor="#FFB800"
              selectedValue={this.props.addPropertyData.property}
              onSelect={v => this.submitSelect("property", v)}
            />
          </div>

          {this.state.propertyType && (
            <div style={{ fontSize: "13px" }}>
              <Gap value="30px" />
              <h2>Select the property type.</h2>
              <Gap value="5px" />
              <div className="addProperty-right-box">
                <SelectBox
                  selectBoxes={this.state.propertyTypeList}
                  activeColor="#FFB800"
                  selectedValue={this.props.addPropertyData.propertyType}
                  onSelect={v => this.submitSelect("propertyType", v)}
                />
              </div>
            </div>
          )}

          {this.state.propertyDetails && (
            <div>
              <Gap value="30px" />
              <h2>{this.state.propertyDetailsText}</h2>
              <Gap value="5px" />
              <div className="addProperty-right-box">
                <InputBox
                  autoComplete="on"
                  type="text"
                  placeholder=""
                  height="30px"
                  width={
                    this.state.addPropertyData.property === "A Hotel"
                      ? "60%"
                      : "30%"
                  }
                  padding="20px"
                  border="1px solid #CFD4DD"
                  borderRadius="5px"
                  fontSize="20px"
                  value={this.props.addPropertyData.roomDetails}
                  // onBlur={() => this.confirmInput("email")}
                  onChange={v => this.submitSelect("propertyTypeDetails", v)}
                />
                <Gap value="5px" />
                <h3>
                  {this.state.addPropertyData.property === "A Hotel"
                    ? "Room"
                    : "Bedroom"}
                </h3>
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

export default AddPropertyStep1;
