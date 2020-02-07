import React, { Component } from "react";
import "./PropertyDetailsPage.css";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import ImageSlider from "../Shared/ImageSlider/ImageSlider.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import Button from "../Shared/Button/Button.jsx";
import { featuresList } from "../../Variables/PropertyFeatures.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { uniqueNumberGenerator } from "../../Functions/RandomNumberGenerator.js";

export class UnconnectedPropertyDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      propertyData: {}
    };
  }

  componentDidMount = () => {
    let _pathArray = this.props.location.pathname.split("/");
    var _propertyID = _pathArray[_pathArray.length - 1];
    this.getProperty(_propertyID);
    console.log(_propertyID);
    console.log("here");
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/property-details/" + _propertyID
    });
  };

  getProperty = async pid => {
    let data = new FormData();
    data.append("propertyID", pid);
    let response = await fetch("/property-by-id?propertyID=" + pid);
    let responseBody = await response.text();
    responseBody = JSON.parse(responseBody);
    if (!responseBody.success) {
      alert(responseBody.message);
      return;
    }

    if (responseBody.success) {
      console.log("hhhhh", responseBody.properties);
      this.setState({
        loading: true,
        propertyData: responseBody.properties[0]
      });
      return;
    }
  };

  getFeatureIconURL = feature => {
    for (let i = 0; i < featuresList.length; i++) {
      if (featuresList[i].title === feature) {
        return "../assets/icons/" + featuresList[i].value + ".svg";
      }
    }
  };

  reserveProperty = () => {
    if (this.props.user._id !== this.state.propertyData.vendorUserID) {
      if (this.props.user.phoneNumber !== undefined) {
        this.props.history.push({
          pathname: "/payment/" + this.state.propertyData._id,
          state: {
            propertyData: this.state.propertyData
          }
        });
      } else {
        this.props.history.push({
          pathname: "/user-profile",
          state: {
            propertyData: this.state.propertyData
          }
        });
      }
    }
  };

  render() {
    console.log("here");
    return (
      this.state.loading && (
        <React.Fragment>
          <NavBar
            borderBottom="none"
            backgroundColor="#f3f4fb"
            home={true}
            addProperty={true}
          />
          <div className="propertyDetailsPage-header">
            <div className="propertyDetailsPage-header-left">
              <ImageSlider
                propertyImageUrls={
                  this.state.propertyData.propertyImageFileURLs
                }
                height="400px"
              />
            </div>
            <div className="propertyDetailsPage-header-right">
              <Gap value="30px" />
              <h3>
                ${this.state.propertyData.price}
                <span>
                  {"/" +
                    (this.state.propertyData.forSale
                      ? "for sale"
                      : this.state.propertyData.paymentInterval.toLowerCase())}
                </span>
                <Gap value="10px" />
              </h3>
              <div>{this.state.propertyData.title.toUpperCase()}</div>
              <Gap value="5px" />
              <div className="propertyDetailsPage-vendor-name">
                Listed by: {this.state.propertyData.vendorFirstName}
              </div>

              <Gap value="30px" />
              <p>{(this.state.propertyData.address + ", ").toUpperCase()}</p>
              <p>
                {(
                  this.state.propertyData.city +
                  " - " +
                  this.state.propertyData.zipCode
                ).toUpperCase()}
              </p>
              <p>
                {(
                  this.state.propertyData.state +
                  ", " +
                  this.state.propertyData.country
                ).toUpperCase()}
              </p>
              {/* <Gap value="30px" />
            <div className="propertyDetailsPage-vendor-name">
              Listed by: {this.state.propertyData.vendorFirstName}
            </div>
            <Gap value="5px" /> */}
              {/* <Button
              buttonLabel={"Contact " + this.state.propertyData.vendorFirstName}
              height="35px"
              width="100%"
              color="#6e7189"
              fontSize="16px"
              borderRadius="15px"
              padding="0 20px"
              border="1px solid #6e7189"
              onClick={() => console.log("contact owner")}
            /> */}
              <Gap value="100px" />
              <SizedShape width="100%" height="1px" backgroundColor="#CFD4DD" />
              <Gap value="30px" />

              <Button
                buttonLabel="Reserve"
                height="35px"
                width="100%"
                color="#FFFFFF"
                fontSize="16px"
                borderRadius="15px"
                padding="0 20px"
                backgroundColor="#FFB800"
                onClick={this.reserveProperty}
              />
            </div>
          </div>

          <div style={{ padding: "20px 100px" }}>
            <SizedShape width="100%" height="1px" backgroundColor="#CFD4DD" />
          </div>
          <div className="propertyDetailsPage-details">
            <div className="propertyDetailsPage-details-left">
              <p>Description</p>
              {this.state.propertyData.description}
            </div>
            <div className="propertyDetailsPage-details-right">
              <p>Features</p>
              <div className="propertyDetailsPage-details-features">
                {this.state.propertyData.featuresList.map(feature => {
                  return (
                    <Button
                      key={uniqueNumberGenerator(6)}
                      buttonLabel={feature}
                      height="35px"
                      color="#6e7189"
                      fontSize="14px"
                      borderRadius="20px"
                      width="200px"
                      suffixIcon={this.getFeatureIconURL(feature)}
                      suffixIconWidth="12px"
                      suffixIconPadding="10px"
                      justifyContent="left"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <Gap value="50px" />
          <Footer />
        </React.Fragment>
      )
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

let PropertyDetailsPage = connect(mapStateToProps)(
  UnconnectedPropertyDetailsPage
);
export default withRouter(PropertyDetailsPage);
