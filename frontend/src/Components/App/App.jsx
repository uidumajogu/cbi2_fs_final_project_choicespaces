import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage/HomePage.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import ForgotPasswordPage from "../ForgotPasswordPage/ForgotPasswordPage.jsx";
import PrivacyStatementPage from "../PrivacyStatementPage/PrivacyStatementPage.jsx";
import TermsAndConditionsPage from "../TermsAndConditionsPage/TermsAndConditionsPage.jsx";
import SignUpPage from "../SignUpPage/SignUpPage.jsx";
import AddPropertyPage from "../AddPropertyPage/AddPropertyPage.jsx";
import { connect } from "react-redux";
import VendorProfilePage from "../VendorProfilePage/VendorProfilePage.jsx";
import DashboardPage from "../DashboardPage/DashboardPage.jsx";
import PropertyDetailsPage from "../PropertyDetailsPage/PropertyDetailsPage.jsx";
import UserProfilePage from "../UserProfilePage/UserProfilePage.jsx";
import PaymentPage from "../PaymentPage/PaymentPage.jsx";
import SearchResultPage from "../SearchResultPage/SearchResultPage.jsx";
import MyProfilePage from "../MyProfilePage/MyProfilePage.jsx";

class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      appIsLoading: true
    };
  }

  componentDidMount = () => {
    this.checkUserLoginStatus();
    // this.updateThings();
  };

  checkUserLoginStatus = async () => {
    let response = await fetch("/user-login-status");
    let responseBody = await response.text();
    responseBody = JSON.parse(responseBody);

    if (responseBody.success) {
      this.props.dispatch({
        type: "LOGGED_IN",
        loggedIn: responseBody.success,
        user: responseBody.user
      });
    }

    this.setState({ appIsLoading: false });
  };

  // updateThings = async () => {
  //   let response = await fetch("/update-things");
  //   let responseBody = await response.text();
  //   responseBody = JSON.parse(responseBody);
  // };

  goToPropertyDetailsPage = rd => {
    return <PropertyDetailsPage />;
  };

  goToPaymentPage = rd => {
    return <PaymentPage propertyData={rd.location.state.propertyData} />;
  };

  goToUserProfile = rd => {
    return <UserProfilePage propertyData={rd.location.state.propertyData} />;
  };

  goToSearchResultPage = rd => {
    return (
      <SearchResultPage
        properties={rd.location.state.properties}
        searchCriteria={rd.location.state.searchCriteria}
      />
    );
  };

  render = () => {
    return (
      !this.state.appIsLoading && (
        <BrowserRouter>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route
            exact={true}
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <Route
            exact={true}
            path="/privacy-statement"
            component={PrivacyStatementPage}
          />
          <Route
            exact={true}
            path="/terms-and-conditions"
            component={TermsAndConditionsPage}
          />
          <Route exact={true} path="/sign-up" component={SignUpPage} />
          <Route
            exact={false}
            path="/add-property"
            component={AddPropertyPage}
          />
          <Route
            exact={false}
            path="/vendor-profile"
            component={VendorProfilePage}
          />

          <Route exact={true} path="/dashboard" component={DashboardPage} />
          <Route
            exact={true}
            path="/property-details/:propertyID"
            component={this.goToPropertyDetailsPage}
          />
          <Route
            exact={false}
            path="/user-profile"
            component={this.goToUserProfile}
          />
          <Route
            exact={true}
            path="/payment/:propertyID"
            component={this.goToPaymentPage}
          />
          <Route
            exact={true}
            path="/search-result/:searchCriteria"
            component={this.goToSearchResultPage}
          />
          <Route exact={true} path="/mayProfile" component={MyProfilePage} />
        </BrowserRouter>
      )
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
