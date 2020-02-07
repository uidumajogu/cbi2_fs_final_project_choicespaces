import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Button from "../Shared/Button/Button.jsx";
import { uniqueNumberGenerator } from "../../Functions/RandomNumberGenerator.js";
import AddPropertyPreview from "./AddPropertyPreview.jsx";

export class AddPropertyStep7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPropertyData: this.props.addPropertyData
    };
  }

  componentDidMount = () => {
    this.setState({
      addPropertyData: this.props.addPropertyData
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
          <h2>Preview and Publish</h2>
          <Gap value="20px" />
          <div className="addPropertyPage-preview-wrapper">
            <AddPropertyPreview
              title="Property"
              description={this.state.addPropertyData.property}
            />
            <AddPropertyPreview
              title="Property Type"
              description={this.state.addPropertyData.propertyType}
            />
            <AddPropertyPreview
              title="Room Details"
              description={
                this.state.addPropertyData.propertyDetails +
                  " " +
                  this.state.addPropertyData.property ===
                "A Hotel"
                  ? "Room"
                  : "Bedroom"
              }
            />
            <AddPropertyPreview
              title="Features"
              description={this.state.addPropertyData.featuresList.map(
                feature => {
                  return <p key={uniqueNumberGenerator(4)}>{feature}</p>;
                }
              )}
            />
            <AddPropertyPreview
              title="Lease Type"
              description={this.state.addPropertyData.propertyLeaseType}
            />

            <AddPropertyPreview
              title="Price"
              description={this.state.addPropertyData.price}
            />

            <AddPropertyPreview
              title="Payment Interval"
              description={
                "EVERY " +
                this.state.addPropertyData.paymentInterval.toUpperCase()
              }
            />

            <AddPropertyPreview
              title="Minimum Rental Period"
              description={
                this.state.addPropertyData.minimumRentalPeriod +
                " " +
                this.state.addPropertyData.paymentInterval.toUpperCase()
              }
            />

            <AddPropertyPreview
              title="Is a new property?"
              description={this.state.addPropertyData.status.toUpperCase()}
            />
            <AddPropertyPreview
              title="Title"
              description={this.state.addPropertyData.title}
            />
            <AddPropertyPreview
              title="Description"
              description={this.state.addPropertyData.description}
            />

            <AddPropertyPreview
              title="Location"
              description={
                this.state.addPropertyData.address +
                ", " +
                this.state.addPropertyData.city +
                ", -" +
                this.state.addPropertyData.zipCode +
                ", " +
                this.state.addPropertyData.state +
                ", " +
                this.state.addPropertyData.country
              }
            />

            <AddPropertyPreview
              title="Images"
              description={
                Object.keys(this.state.addPropertyData.images).length +
                " images uploaded"
              }
            />
          </div>

          <Gap value="30px" />

          <div className="addProperty-right-box-button">
            <div></div>
            <Button
              buttonLabel="PUBLISH"
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

export default AddPropertyStep7;
