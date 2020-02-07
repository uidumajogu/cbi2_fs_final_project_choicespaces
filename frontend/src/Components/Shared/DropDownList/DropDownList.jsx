import React, { Component } from "react";
import "./DropDownList.css";
import Button from "../Button/Button.jsx";

export class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      label: this.props.label
    };
  }

  toggleShowList = () => {
    let _showList = this.state.showList;
    this.setState({ showList: !_showList });
  };

  listItemSelected = selectedItem => {
    this.props.itemSelected(selectedItem);
    this.setState({ label: selectedItem });
    this.toggleShowList();
  };

  dropDownListLabelStyle = {
    color: this.props.labelColor
      ? this.props.labelColor
      : "rgba(53, 79, 139, 0.8)",
    borderRight: this.props.labelBorderRight
      ? this.props.labelBorderRight
      : "1px solid rgba(53, 79, 139, 0.8)",
    width: this.props.labelBorderWidth ? this.props.labelBorderWidth : "150px"
  };

  dropDownListContainerStyle = {
    width: "100%",
    marginTop: this.props.listClearance ? this.props.listClearance : "50px",
    height: this.props.dropDownListHeight
  };

  render() {
    return (
      <div className="dropDownListLabel" style={this.dropDownListLabelStyle}>
        <Button
          buttonLabel={this.props.label}
          color="rgba(53, 79, 139, 0.8)"
          fontSize="12px"
          padding="0 10px"
          suffixIcon={this.props.labelSuffixIcon}
          suffixIconEmoji={this.props.suffixIconEmoji}
          suffixIconWidth={this.props.labelSuffixIconWidth}
          suffixIconPadding={this.props.labelSuffixIconPadding}
          onClick={this.toggleShowList}
        />

        {this.state.showList && (
          <div
            className="dropDownListContainer"
            style={this.dropDownListContainerStyle}
          >
            <div>
              {this.props.listItems.map(item => {
                return (
                  <Button
                    key={item.value.toString()}
                    buttonLabel={item.label}
                    color="rgba(53, 79, 139, 0.8)"
                    fontSize="12px"
                    margin="5px 0"
                    padding="5px 20px"
                    suffixIcon={item.suffixIcon}
                    suffixIconEmoji={item.suffixIconEmoji}
                    suffixIconWidth={item.suffixIconWidth}
                    suffixIconPadding={item.suffixIconPadding}
                    onClick={() => this.listItemSelected(item)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DropDownList;
