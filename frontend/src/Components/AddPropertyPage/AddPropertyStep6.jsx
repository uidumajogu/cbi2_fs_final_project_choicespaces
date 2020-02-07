import React, { Component } from "react";
import "./AddPropertyPage.css";
import Gap from "../Shared/Gap/Gap.jsx";
import Button from "../Shared/Button/Button.jsx";
import UploadButton from "../Shared/UploadButton/UploadButton.jsx";
import { uniqueNumberGenerator } from "../../Functions/RandomNumberGenerator.js";

export class AddPropertyStep6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageUploaded: false,
      mainImageUpload: {},
      otherImagesUploaded: false,
      otherImagesUpload: [],
      addPropertyData: this.props.addPropertyData
    };
  }

  componentDidMount = () => {
    let _mainImageUpload =
      this.props.addPropertyData.images[0] === undefined
        ? {}
        : { 0: this.props.addPropertyData.images[0] };

    let _otherImagesUpload = [];
    if (this.props.addPropertyData.images[1] === undefined) {
      _otherImagesUpload = [];
    } else {
      for (
        let i = 1;
        i < Object.keys(this.props.addPropertyData.images).length;
        i++
      ) {
        _otherImagesUpload.push(this.props.addPropertyData.images[i]);
      }
    }

    this.setState({
      mainImageUpload: _mainImageUpload,
      mainImageUploaded:
        Object.keys(_mainImageUpload).length === 0 ? false : true,
      otherImagesUpload: _otherImagesUpload,
      otherImagesUploaded: _otherImagesUpload.length === 0 ? false : true
    });
  };

  mainImageUpload = event => {
    let _images = {
      ...this.state.addPropertyData.images,
      0: event.target.files[0]
    };

    let _addPropertyData = {
      ...this.state.addPropertyData,
      images: _images
    };
    this.setState({
      mainImageUpload: _images,
      mainImageUploaded: true,
      addPropertyData: _addPropertyData
    });
  };

  otherImagesUpload = event => {
    let _otherImagesUpload = [];
    let _images = {};
    for (let i = 0; i < Object.keys(event.target.files).length; i++) {
      _otherImagesUpload.push(event.target.files[i]);
      _images[i + 1] = event.target.files[i];
    }

    let _newImages = {
      ...this.state.mainImageUpload,
      ..._images
    };
    let _addPropertyData = {
      ...this.state.addPropertyData,
      images: _newImages
    };

    let _newOtherImagesUpload = [
      ...this.state.otherImagesUpload,
      ..._otherImagesUpload
    ];

    this.setState({
      otherImagesUpload: _newOtherImagesUpload,
      otherImagesUploaded: true,
      addPropertyData: _addPropertyData
    });
  };

  submitData = data => {
    this.props.submitData(data);
  };

  render() {
    return (
      <div className="addPropertyPage-wrapper">
        <div>
          <Gap value="20px" />
          <h4>{this.props.title}</h4>
          <Gap value="5px" />
          <p>{this.props.description}</p>
        </div>
        <Gap value="150px" />
        <div>
          <Gap value="30px" />
          <h2>Upload images of the property</h2>
          <Gap value="10px" />
          <div className="addProperty-right-box-button">
            <div className="addProperty-main-image">
              <UploadButton
                title="Upload main image"
                backgroundColor="#FF007A"
                color="#FFFFFF"
                border="none"
                uploadFile={f => this.mainImageUpload(f)}
              />
              <Gap value="10px" />
              {this.state.mainImageUploaded && (
                <img
                  width="480px"
                  src={URL.createObjectURL(this.state.mainImageUpload[0])}
                  alt="Main Property"
                />
              )}
            </div>
            <Gap value="10px" />
            <div className="addProperty-other-images-wrapper">
              <UploadButton
                title="Upload other images"
                backgroundColor="#FFB800"
                color="#FFFFFF"
                border="none"
                multiple={true}
                uploadFile={f => this.otherImagesUpload(f)}
              />
              <Gap value="10px" />
              <div className="addProperty-other-images">
                {this.state.otherImagesUploaded &&
                  this.state.otherImagesUpload.map((image, index) => {
                    return (
                      <div key={uniqueNumberGenerator(4)}>
                        <Gap value="10px" />
                        <img
                          width="280px"
                          src={URL.createObjectURL(image)}
                          alt={"Other Property " + index}
                        />
                      </div>
                    );
                  })}
              </div>
              <Gap value="10px" />
            </div>
          </div>

          <Gap value="30px" />

          <div className="addProperty-right-box-button">
            <div></div>
            <Button
              buttonLabel="NEXT"
              width="30%"
              height="45px"
              color="#FFFFFF"
              fontSize="16px"
              borderRadius="5px"
              backgroundColor="#21528D"
              onClick={() => this.submitData(this.state.addPropertyData)}
            />
          </div>
          <Gap value="30px" />
        </div>
      </div>
    );
  }
}

export default AddPropertyStep6;
