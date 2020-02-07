import React, { Component } from "react";
import "./AddPropertyPage.css";
import { connect } from "react-redux";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import AddPropertyStep1 from "./AddPropertyStep1.jsx";
import AddPropertyStep2 from "./AddPropertyStep2.jsx";
import AddPropertyStep3 from "./AddPropertyStep3.jsx";
import AddPropertyStep4 from "./AddPropertyStep4.jsx";
import AddPropertyStep5 from "./AddPropertyStep5.jsx";
import AddPropertyStep6 from "./AddPropertyStep6.jsx";
import AddPropertyStep7 from "./AddPropertyStep7.jsx";

class UnconnectedAddPropertyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPropertyData: {
        property: "",
        propertyType: "",
        roomDetails: "",
        featuresList: [],
        propertyLeaseType: "",
        paymentInterval: "",
        price: "",
        minimumRentalPeriod: "1",
        title: "",
        status: "",
        description: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zipCode: "",
        images: {}
      }
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/add-property/step1"
    });

    if (!this.props.loggedIn) {
      this.props.history.push("/login");
      return;
    }
    if (!(this.props.user.userType === "vendor")) {
      this.props.history.push("/vendor-profile");
      return;
    }
    this.props.history.push("/add-property/step1");
  };

  nextStep = (data, step) => {
    if (step === 7) {
      this.uploadListing(data);
      return;
    }
    this.setState({
      addPropertyData: data
    });
    this.props.history.push("/add-property/step" + (step + 1));
  };

  uploadListing = async data => {
    let formData = new FormData();
    for (let i = 0; i < Object.keys(data.images).length; i++) {
      formData.append(
        "property-images",
        data.images[i],
        data.images[i]["name"]
      );
    }

    formData.append("property", data.property);
    formData.append("propertyType", data.propertyType);
    formData.append("roomDetails", data.roomDetails);
    formData.append("featuresList", JSON.stringify(data.featuresList));
    formData.append("propertyLeaseType", data.propertyLeaseType);
    formData.append("paymentInterval", data.paymentInterval);
    formData.append("price", JSON.stringify(parseFloat(data.price)));
    formData.append(
      "minimumRentalPeriod",
      JSON.stringify(parseInt(data.minimumRentalPeriod))
    );
    formData.append("title", data.title);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("country", data.country);

    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("zipCode", data.zipCode);
    let response = await fetch("/property-data-upload", {
      method: "POST",
      body: formData
    });

    let responseBody = await response.text();

    responseBody = JSON.parse(responseBody);

    if (!responseBody.success) {
      alert(responseBody.message);
      return;
    }
    if (responseBody.success) {
      this.props.history.push("/dashboard");
      return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar home={true} backgroundColor="#f3f4fb" />
        {this.props.location.pathname === "/add-property/step1" && (
          <AddPropertyStep1
            title="Step 1"
            description="The Basics"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 1)}
          />
        )}
        {this.props.location.pathname === "/add-property/step2" && (
          <AddPropertyStep2
            title="Step 2"
            description="The Features"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 2)}
          />
        )}
        {this.props.location.pathname === "/add-property/step3" && (
          <AddPropertyStep3
            title="Step 3"
            description="Price and Additional"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 3)}
          />
        )}
        {this.props.location.pathname === "/add-property/step4" && (
          <AddPropertyStep4
            title="Step 4"
            description="Title and Descriptions"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 4)}
          />
        )}
        {this.props.location.pathname === "/add-property/step5" && (
          <AddPropertyStep5
            title="Step 5"
            description="Property Location"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 5)}
          />
        )}
        {this.props.location.pathname === "/add-property/step6" && (
          <AddPropertyStep6
            title="Step 6"
            description="Images"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 6)}
          />
        )}

        {this.props.location.pathname === "/add-property/step7" && (
          <AddPropertyStep7
            title="Step 7"
            description="Finish"
            addPropertyData={this.state.addPropertyData}
            submitData={d => this.nextStep(d, 7)}
          />
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  };
};

let AddPropertyPage = connect(mapStateToProps)(UnconnectedAddPropertyPage);
export default AddPropertyPage;
