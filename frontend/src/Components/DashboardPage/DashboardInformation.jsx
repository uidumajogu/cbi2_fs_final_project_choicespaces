import React, { Component } from "react";
import DashBoardInformationCard from "./DashBoardInformationCard.jsx";
import "./DashboardPage.css";
import SizedShape from "../Shared/SizedShape/SizedShape.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import { uniqueNumberGenerator } from "../../Functions/RandomNumberGenerator.js";

export class DashboardInformation extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="dashBoardInformationCard-wrapper">
          <DashBoardInformationCard
            title="All Properties"
            description={this.props.numberOfProperties}
            width="20%"
            height="150px"
          />

          <DashBoardInformationCard
            title="Total Paid"
            description={this.props.totalPaid}
            width="20%"
            height="150px"
          />

          <DashBoardInformationCard
            title="Total Views"
            description={this.props.views}
            width="20%"
            height="150px"
          />

          <DashBoardInformationCard
            title="Reviews"
            description={this.props.reviews}
            width="20%"
            height="150px"
          />
        </div>
        <Gap value="50px" />
        <div className="dashboard-propertyDetails">
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <SizedShape
              backgroundColor="#E2F1FE"
              width="30px"
              height="30px"
              borderRadius="100px"
            />
            <Gap value="10px" />
            <h5>My Listed Properties</h5>
          </div>

          <table>
            <thead>
              <tr>
                <th align="center">SN</th>
                <th align="left">Property</th>
                <th align="left">Price</th>
                <th align="center">Status</th>
                <th align="center">Views</th>
                <th align="center">Reviews</th>
                <th align="center">Published</th>
              </tr>
            </thead>
            <tbody>
              {this.props.vendorProperties.reverse().map(property => {
                return (
                  <tr key={uniqueNumberGenerator(4)}>
                    <td align="center">
                      {this.props.vendorProperties.indexOf(property) + 1}
                    </td>
                    <td>{property.title}</td>
                    <td>${property.price}</td>
                    <td align="center">
                      {property.taken ? "Taken" : "Available"}
                    </td>
                    <td align="center">{property.views}</td>
                    <td align="center">{property.reviews}</td>
                    <td align="center">
                      <label>
                        <input type="checkbox" checked={property.published} />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardInformation;
