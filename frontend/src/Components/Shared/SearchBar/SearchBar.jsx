import React, { Component } from "react";
import "./SearchBar.css";
import InputBox from "../InputBox/InputBox.jsx";
import Button from "../Button/Button.jsx";
import { withRouter } from "react-router-dom";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  searchInput = value => {
    this.setState({
      searchInput: value
    });
  };

  submitSearch = async event => {
    let response = await fetch(
      "/search-by-random-string?criteria=" + this.state.searchInput
    );
    let responseBody = await response.text();
    responseBody = JSON.parse(responseBody);

    if (responseBody.success) {
      this.props.history.push({
        pathname: "/search-result/" + this.state.searchInput,
        state: {
          properties: responseBody.properties,
          searchCriteria: this.state.searchInput
        }
      });
    } else {
      console.log(responseBody.message);
    }
  };

  render() {
    return (
      <div className="searchBox-wrapper">
        <div className="searchBox-wrapper-row">
          <InputBox
            autoComplete="on"
            type="text"
            placeholder="Search by country, state or city "
            height="30px"
            padding="20px 20px"
            border="1px solid #f3f4fb"
            borderRadius="40px"
            fontSize="14px"
            // onBlur={() => this.confirmInput("email")}
            onChange={v => this.searchInput(v)}
          />

          <Button
            width="35px"
            height="35px"
            color="#FFFFFF"
            borderRadius="50px"
            padding="10px"
            margin="0 0 0 10px"
            backgroundColor="#FFB800"
            suffixIcon="../assets/icons/search_icon.svg"
            suffixIconWidth="15px"
            onClick={this.submitSearch}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
