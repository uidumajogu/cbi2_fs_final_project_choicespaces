import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Button from "../Shared/Button/Button.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import SelectBox from "../Shared/SelectBox/SelectBox.jsx";
import { featuresList } from "../../Variables/PropertyFeatures.js";

export class AddPropertyStep2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuresList: [],
      addPropertyData: this.props.addPropertyData
    };
  }

  componentDidMount = () => {
    this.setState({
      featuresList: this.props.addPropertyData.featuresList
    });
  };

  submitSelect = (type, value) => {
    let _addPropertyData = {
      ...this.state.addPropertyData,
      featuresList: value
    };

    this.setState({
      featuresList: value,
      addPropertyData: _addPropertyData
    });
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
          <h2>Select the features of the property</h2>
          <Gap value="5px" />

          <div className="addProperty-right-box" style={{ width: "650px" }}>
            <SelectBox
              selectBoxes={featuresList}
              activeColor="#FF007A"
              selectType="multi"
              includeSuffixImage={true}
              selectGroupValues={this.props.addPropertyData.featuresList}
              onSelect={v => this.submitSelect("featuresList", v)}
            />
          </div>

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

export default AddPropertyStep2;
