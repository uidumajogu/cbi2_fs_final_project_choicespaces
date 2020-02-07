import React, { Component } from "react";
import "./PageIntro.css";
import Button from "../Button/Button.jsx";
import Gap from "../Gap/Gap.jsx";

export class PageIntro extends Component {
  render() {
    return (
      <div className="PageIntro-Wrapper">
        <div className="PageIntro-left-section">
          <p>{this.props.introText1}</p>
          <p>{this.props.introText2}</p>
          <p>{this.props.introText3}</p>
          <Gap value="30px" />
          <Button
            buttonLabel="Continue"
            width="200px"
            height="40px"
            color="#FFFFFF"
            fontSize="18px"
            borderRadius="20px"
            padding="0 20px"
            backgroundColor="#FFB800"
            onClick={this.props.clickStart}
          />
        </div>
        <img width="50%" src={this.props.imageURL} alt=""></img>
      </div>
    );
  }
}

export default PageIntro;
