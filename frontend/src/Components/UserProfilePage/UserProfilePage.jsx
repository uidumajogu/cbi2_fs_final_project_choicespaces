import React, { Component } from "react";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import { withRouter } from "react-router-dom";
import PageIntro from "../Shared/PageIntro/PageIntro.jsx";
import PersonalInfoForm from "../Shared/PersonalInfoForm/PersonalInfoForm.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import ProfileImageUpload from "../Shared/ProfileImageUpload/ProfileImageUpload.jsx";
import { connect } from "react-redux";
import "./UserProfilePage.css";

let stepperData = [
  {
    index: 0,
    title: "Personal Information",
    description: "This is required for documentation",
    path: "/user-profile/personal-info"
  },
  {
    index: 1,
    title: "Profile Image",
    description: "This is required for identification",
    path: "/user-profile/profile-image"
  }
];

export class UnconnectedUserProfilePage extends Component {
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
        userType: "user"
      }
    };
  }

  componentDidMount = () => {
    if (this.props.loggedIn) {
      this.props.dispatch({
        type: "CURRENT_PATH",
        path: "/user-profile"
      });
    }

    if (!this.props.loggedIn) {
      this.props.history.push("/login");
      return;
    }
  };

  goToPage = pageLink => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: pageLink
    });

    this.props.history.push({
      pathname: pageLink,
      state: {
        propertyData: this.props.propertyData
      }
    });
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
      this.submitUserProfile(data, this.props.propertyData);
    }
  };

  submitUserProfile = async (formData, property) => {
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
        loggedIn: responseBody.success,
        user: responseBody.user
      });
      this.props.history.push({
        pathname: "/payment/" + property._id,
        state: {
          propertyData: property
        }
      });
      return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar addProperty={true} backgroundColor="#f3f4fb" />
        <div className="userProfilePage-Wrapper">
          {this.props.location.pathname === "/user-profile" && (
            <PageIntro
              introText1="A very cool choice!"
              introText2="One more step - we need few details for identification and documentation."
              introText3="Let’s get started."
              imageURL="../assets/images/scenes.png"
              clickStart={() => this.goToPage("/user-profile/personal-info")}
            />
          )}
          {this.props.location.pathname !== "/user-profile" && (
            <div>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                {this.state.stepTitle}
              </div>
              <Gap value="50px" />

              <div className="userProfilePage-profile">
                <div>
                  {this.props.location.pathname ===
                    "/user-profile/personal-info" && (
                    <PersonalInfoForm
                      stepperData={stepperData}
                      step={this.state.step}
                      formData={this.state.formData}
                      previousForm={data => this.previousStep(data)}
                      nextForm={data => this.nextStep(data)}
                    />
                  )}

                  {this.props.location.pathname ===
                    "/user-profile/profile-image" && (
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

let mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  };
};

let UserProfilePage = connect(mapStateToProps)(UnconnectedUserProfilePage);
export default withRouter(UserProfilePage);
