import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import NavBar from "../Shared/NavBar/NavBar.jsx";
import Footer from "../Shared/Footer/Footer.jsx";
import PropertySearchDisplay from "../Shared/PropertySearchDisplay/PropertySearchDisplay.jsx";
import { connect } from "react-redux";

export class UnconnectedHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProperties: []
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "CURRENT_PATH",
      path: "/"
    });
    this.getAllProperties();
  };

  getAllProperties = async () => {
    let response = await fetch("/all-properties");
    let responseBody = await response.text();

    responseBody = JSON.parse(responseBody);

    this.setState({
      allProperties: responseBody.properties.reverse()
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          borderBottom="none"
          backgroundColor="transparent"
          addProperty={true}
          fixed={true}
        />
        <Header searchResult={(s, d) => this.pushSearchResult(s, d)} />
        <PropertySearchDisplay properties={this.state.allProperties} />
        <Footer />
      </React.Fragment>
    );
  }
}

let HomePage = connect()(UnconnectedHomePage);
export default HomePage;
