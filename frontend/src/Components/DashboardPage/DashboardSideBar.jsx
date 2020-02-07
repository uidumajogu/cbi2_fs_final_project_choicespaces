import React, { Component } from "react";
import SelectBox from "../Shared/SelectBox/SelectBox.jsx";

let sideBarList = [
  {
    title: "Overview",
    value: "overview"
  },
  {
    title: "Messages",
    value: "messages"
  }
];

export class DashboardSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "Overview"
    };
  }

  tabOnClick = value => {
    this.setState({ currentTab: value });
    this.props.onSelect(value);
  };

  render() {
    return (
      <div className="dashboard-sidebar">
        <SelectBox
          selectBoxes={sideBarList}
          activeColor="#ffffff"
          border="none"
          padding="5px 10px"
          outerMargin="30px 0"
          backgroundColor="transparent"
          color="#f3f4fb"
          selectedValue={this.state.currentTab}
          onSelect={v => this.tabOnClick(v)}
        />
      </div>
    );
  }
}

export default DashboardSideBar;
