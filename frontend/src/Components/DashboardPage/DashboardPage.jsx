import React, { Component } from "react";
import "./DashboardPage.css";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardInformation from "./DashboardInformation.jsx";
import DashboardMessages from "./DashboardMessages.jsx";
import { connect } from "react-redux";

export class UnconnectedDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Overview",
      vendorProperties: [],
      numberOfProperties: 0,
      views: 0,
      totalPaid: 0,
      reviews: 0
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/dashboard"
    });
    this.getVendorProperties();
  };

  getVendorProperties = async () => {
    let response = await fetch("/vendor-properties");
    let responseBody = await response.text();

    responseBody = JSON.parse(responseBody);

    let _vendorProperties = responseBody.properties;
    let _numberOfProperties = 0;
    let _views = 0;
    let _totalPaid = 0;
    let _reviews = 0;

    _vendorProperties.forEach(property => {
      _numberOfProperties = _numberOfProperties + 1;
      _views = _views + property.views;
      _totalPaid = _totalPaid + property.totalPaid;
      _reviews = _reviews + property.views;
    });

    this.setState({
      vendorProperties: _vendorProperties.reverse(),
      numberOfProperties: _numberOfProperties,
      views: _views,
      totalPaid: _totalPaid,
      reviews: _reviews
    });
  };

  selectedTab = value => {
    this.setState({
      selectedTab: value.title
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          borderBottom="1px solid #21528d"
          backgroundColor="transparent"
          addProperty={true}
          home={true}
          dashboard={false}
          logoType="light"
          fixed={true}
        />
        <div className="dashboard-wrapper">
          <DashboardSideBar onSelect={v => this.selectedTab(v)} />
          <div className="dashboard-body-wrapper">
            <div className="dashboard-body">
              {this.state.selectedTab === "Overview" && (
                <DashboardInformation
                  numberOfProperties={this.state.numberOfProperties}
                  views={this.state.views}
                  reviews={this.state.reviews}
                  totalPaid={"$" + this.state.totalPaid}
                  vendorProperties={this.state.vendorProperties}
                />
              )}

              {this.state.selectedTab === "Messages" && <DashboardMessages />}
            </div>
          </div>
        </div>
        <div
          style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "2" }}
        >
          <Footer footerUpper={false} logo={false} />
        </div>
      </React.Fragment>
    );
  }
}

let DashboardPage = connect()(UnconnectedDashboardPage);
export default DashboardPage;
