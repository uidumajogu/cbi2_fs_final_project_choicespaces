import React, { Component } from "react";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import { withRouter } from "react-router-dom";
import PageIntro from "../Shared/PageIntro/PageIntro.jsx";
import PersonalInfoForm from "../Shared/PersonalInfoForm/PersonalInfoForm.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import VendorProfilePageBankInfoForm from "./VendorProfilePageBankInfoForm/VendorProfilePageBankInfoForm.jsx";
import ProfileImageUpload from "../Shared/ProfileImageUpload/ProfileImageUpload.jsx";
import { connect } from "react-redux";
import "./VendorProfilePage.css";

let stepperData = [
  {
    index: 0,
    title: "Personal Information",
    description: "This is required to enable us deliver tailored services",
    path: "/vendor-profile/personal-info"
  },
  {
    index: 1,
    title: "Bank Information",
    description: "This is required for payment purposes",
    path: "/vendor-profile/bank-info"
  },
  {
    index: 2,
    title: "Profile Image (optional)",
    description: "Vendors with profile images attract more clients",
    path: "/vendor-profile/profile-image"
  }
];

export class UnconnectedVendorProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      stepTitle: "Personal Information",
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        country: "",
        state: "",
        city: "",
        accountName: "",
        accountNumber: "",
        bankName: "",
        routingNumber: "",
        imageFile: "",
        userType: "vendor"
      }
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/vendor-profile"
    });

    // this.props.history.push("/user-profile");
  };

  goToPage = pageLink => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: pageLink
    });
    this.props.history.push(pageLink);
  };

  previousStep = data => {
    let _formData = data;
    let _newStep = this.state.step - 1;
    this.setState({
      formData: _formData,
      step: _newStep,
      stepTitle: stepperData[_newStep]["title"]
    });
    if (this.state.step !== 0) {
      this.goToPage(stepperData[_newStep]["path"]);
    }
  };

  nextStep = data => {
    let _formData = data;
    let _newStep = this.state.step + 1;
    this.setState({
      formData: _formData,
      step: _newStep,
      stepTitle:
        this.state.step < stepperData.length - 1 &&
        stepperData[_newStep]["title"]
    });
    if (this.state.step < stepperData.length - 1) {
      this.goToPage(stepperData[_newStep]["path"]);
    } else {
      this.submitVendorProfile(data);
    }
  };

  submitVendorProfile = async formData => {
    let data = new FormData();
    data.append("firstName", formData["firstName"]);
    data.append("lastName", formData["lastName"]);
    data.append("phoneNumber", formData["phoneNumber"]);
    data.append("address", formData["address"]);

    data.append("state", formData["state"]);
    data.append("accountName", formData["accountName"]);
    data.append("zipCode", formData["zipCode"]);
    data.append("country", formData["country"]);
    data.append("bankName", formData["bankName"]);
    data.append("routingNumber", formData["routingNumber"]);
    data.append("accountNumber", formData["accountNumber"]);
    data.append("userType", formData["userType"]);
    data.append("file", formData["imageFile"]);

    let response = await fetch("/upload-profile", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    responseBody = JSON.parse(responseBody);

    if (!responseBody.success) {
      return;
    }
    if (responseBody.success) {
      this.props.dispatch({
        type: "LOGGED_IN",
        value: responseBody.user
      });
      this.props.history.push("/dashboard");
      return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar addProperty={true} backgroundColor="#f3f4fb" />
        <div className="vendorProfilePage-Wrapper">
          {this.props.location.pathname === "/vendor-profile" && (
            <PageIntro
              introText1="Great to have you here!"
              introText2="We need few details to develop a unique experience for you."
              introText3="Let’s get started with listing your space."
              imageURL="../assets/images/analytics.png"
              clickStart={() => this.goToPage("/vendor-profile/personal-info")}
            />
          )}
          {this.props.location.pathname !== "/vendor-profile" && (
            <div>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                {this.state.stepTitle}
              </div>
              <Gap value="50px" />

              <div className="vendorProfilePage-profile">
                <div>
                  {this.props.location.pathname ===
                    "/vendor-profile/personal-info" && (
                    <PersonalInfoForm
                      stepperData={stepperData}
                      step={this.state.step}
                      formData={this.state.formData}
                      previousForm={data => this.previousStep(data)}
                      nextForm={data => this.nextStep(data)}
                    />
                  )}

                  {this.props.location.pathname ===
                    "/vendor-profile/bank-info" && (
                    <VendorProfilePageBankInfoForm
                      stepperData={stepperData}
                      step={this.state.step}
                      formData={this.state.formData}
                      previousForm={data => this.previousStep(data)}
                      nextForm={data => this.nextStep(data)}
                    />
                  )}

                  {this.props.location.pathname ===
                    "/vendor-profile/profile-image" && (
                    <ProfileImageUpload
                      stepperData={stepperData}
                      step={this.state.step}
                      formData={this.state.formData}
                      previousForm={data => this.previousStep(data)}
                      nextForm={data => this.nextStep(data)}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

let VendorProfilePage = connect()(UnconnectedVendorProfilePage);
export default withRouter(VendorProfilePage);
