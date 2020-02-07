import React, { Component } from "react";
import "./Header.css";
import SearchBar from "../../Shared/SearchBar/SearchBar.jsx";
import Gap from "../../Shared/Gap/Gap.jsx";

export class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-left-section">
          <h1>Looking...</h1>
          <p>FOR CHOICESPACES FOR YOU!</p>
          <div>Property for sale and for rent around the world</div>
          <Gap value="50px" />
          <SearchBar />
        </div>
        <div className="header-right-section-wrapper1">
          <div className="header-right-section-wrapper2">
            <div className="header-right-section"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
