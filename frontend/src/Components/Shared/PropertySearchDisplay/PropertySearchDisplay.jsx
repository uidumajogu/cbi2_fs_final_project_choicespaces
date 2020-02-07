import React, { Component } from "react";
import "./PropertySearchDisplay.css";
import { uniqueNumberGenerator } from "../../../Functions/RandomNumberGenerator.js";
import Gap from "../Gap/Gap.jsx";
import { Link } from "react-router-dom";
import ReviewStars from "../ReviewStars/ReviewStars.jsx";

export class PropertySearchDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favProperty: false
    };
  }

  propertySearchDisplayCardStyle = {};

  onChangeFav = () => {
    let _favProperty = this.state.favProperty;
    this.setState({
      favProperty: !_favProperty
    });
  };

  render() {
    return (
      <div className="propertySearchDisplay-wrapper">
        <div className="propertySearchDisplay-card-wrapper">
          {this.props.properties.map(property => {
            return (
              <div
                key={uniqueNumberGenerator(6)}
                className="propertySearchDisplay-card"
              >
                <Link
                  to={{
                    pathname: "/property-details/" + property._id,
                    state: {
                      propertyData: property
                    }
                  }}
                >
                  <img src={property.propertyMainImageURL} alt="Property"></img>
                </Link>
                <Gap value="10px" />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="propertySearchDisplay-card-details">
                    <div>
                      <div className="propertySearchDisplay-card-title">
                        {property.title.toUpperCase()}
                      </div>
                      <p>
                        {(
                          property.city +
                          ", " +
                          property.country
                        ).toUpperCase()}
                      </p>
                      <h3>
                        ${property.price}
                        <span>
                          {"/" +
                            (property.forSale
                              ? "for sale"
                              : property.paymentInterval.toLowerCase())}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <ReviewStars reviewStars={property.reviewStars} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PropertySearchDisplay;
