import React, { Component } from "react";

export class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectGroupValues: [],
      selectedValue: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      selectedValue: this.props.selectedValue ? this.props.selectedValue : "",
      selectGroupValues: this.props.selectGroupValues
        ? this.props.selectGroupValues
        : []
    });
  };

  selectBoxStyle = {
    color: this.props.color ? this.props.color : "#6E7189",
    backgroundColor: this.props.backgroundColor
      ? this.props.backgroundColor
      : "#FFFFFF",
    border: this.props.border ? this.props.border : "1px solid #6E7189",
    borderRadius: this.props.borderRadius ? this.props.borderRadius : "10px",
    padding: this.props.padding ? this.props.padding : "10px 20px",
    margin: this.props.margin ? this.props.margin : "3px",
    fontSize: this.props.fontSize ? this.props.fontSize : "16px"
  };

  onSelect = (selectGroupValues, selectBox) => {
    if (this.props.selectType === "multi") {
      let _selectGroupValues = [...selectGroupValues, selectBox.title];

      this.setState({
        selectGroupValues: _selectGroupValues
      });
      this.props.onSelect(_selectGroupValues);
    } else {
      this.setState({
        selectedValue: selectBox.title
      });
      this.props.onSelect(selectBox);
    }
  };

  render() {
    return this.props.selectBoxes.map(selectBox => {
      return (
        <div
          key={selectBox.value}
          style={{
            padding: "2px",
            margin: this.props.outerMargin ? this.props.outerMargin : "2px",
            borderRadius: this.props.borderRadius
              ? this.props.borderRadius
              : "10px",

            border:
              this.props.selectType === "multi"
                ? this.state.selectGroupValues.includes(selectBox.title)
                  ? "1px solid " + this.props.activeColor
                  : "none"
                : this.state.selectedValue === selectBox.title
                ? "1px solid " + this.props.activeColor
                : "none"
          }}
        >
          <button
            className="selectBox"
            style={this.selectBoxStyle}
            onClick={() =>
              this.onSelect(this.state.selectGroupValues, selectBox)
            }
          >
            {this.props.includeSuffixImage && (
              <img
                width="20px"
                height="20px"
                src={"../assets/icons/" + selectBox.value + ".svg"}
                alt=""
              ></img>
            )}
            <div>{selectBox.title}</div>
          </button>
        </div>
      );
    });
  }
}

export default SelectBox;
