import React, { Component } from "react";
import "./SearchResultPage.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import PropertySearchDisplay from "../Shared/PropertySearchDisplay/PropertySearchDisplay.jsx";
import SearchBar from "../Shared/SearchBar/SearchBar.jsx";
import Gap from "../Shared/Gap/Gap.jsx";
import Footer from "../Shared/Footer/Footer.jsx";

export class UnconnectedSearchResultPage extends Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/search-result/" + this.props.searchCriteria
    });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          borderBottom="1px solid #dde0e7"
          backgroundColor="transparent"
          addProperty={true}
          home={true}
          fixed={true}
        />
        <div className=" searchResultPage-search-row">
          <div className="searchResultPage-search-row-body">
            <Gap />
            <div style={{ width: "500px" }}>
              <SearchBar />
              <Gap value="15px" />
              Found
              {" " + this.props.properties.length + " "}
              results for <span>{'"' + this.props.searchCriteria + '"'}</span>
            </div>
            <Gap />
          </div>
        </div>
        <Gap value="250px" />
        <PropertySearchDisplay properties={this.props.properties} />
        <Footer />
      </React.Fragment>
    );
  }
}

let SearchResultPage = connect()(UnconnectedSearchResultPage);
export default withRouter(SearchResultPage);
