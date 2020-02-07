import React, { Component } from "react";
import Button from "../Button/Button.jsx";
import "./ImageSlider.css";

export class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageInViewUrl: this.props.propertyImageUrls[0],
      currentImageUrlIndex: 0
    };
  }

  mainViewImageStyle = {
    height: this.props.height ? this.props.height : "350px"
  };

  onClick = (index, direction) => {
    if (direction === "left") {
      if (index > 0) {
        this.setState({
          imageInViewUrl: this.props.propertyImageUrls[index - 1],
          currentImageUrlIndex: index - 1
        });
      }
    }

    if (direction === "right") {
      if (index < this.props.propertyImageUrls.length - 1) {
        this.setState({
          imageInViewUrl: this.props.propertyImageUrls[index + 1],
          currentImageUrlIndex: index + 1
        });
      }
    }
  };

  render() {
    return (
      <div className="imageSlider-main-view">
        <Button
          width="35px"
          height="35px"
          suffixIcon={"../assets/icons/chevron_left.svg"}
          suffixIconWidth="35px"
          onClick={() => this.onClick(this.state.currentImageUrlIndex, "left")}
        />
        <div
          style={this.mainViewImageStyle}
          className="imageSlider-main-view-image"
        >
          <img
            height={this.props.height ? this.props.height : "350px"}
            src={this.state.imageInViewUrl}
            alt="Slide"
          ></img>
        </div>

        <Button
          width="35px"
          height="35px"
          suffixIcon={"../assets/icons/chevron_right.svg"}
          suffixIconWidth="35px"
          onClick={() => this.onClick(this.state.currentImageUrlIndex, "right")}
        />
      </div>
    );
  }
}

export default ImageSlider;
