import React, { Component } from "react";
import "./MinimalFilterBar.css";
import Button from "../Button/Button.jsx";
import DropDownList from "../DropDownList/DropDownList.jsx";
import CountriesData from "countrycitystatejson";

// const countryList = [
//   { label: "USA", value: "USA" },
//   { label: "Canada", value: "Canada" },
//   { label: "UK", value: "UK" }
// ];

const propertyTypeList = [
  { label: "Condo", value: "Condo" },
  { label: "Apartment", value: "Apartment" },
  { label: "House", value: "House" }
];

// const cityList = [
//   { label: "Montreal", value: "Montreal" },
//   { label: "Toronto", value: "Toronto" },
//   { label: "Ottawa", value: "Ottawa" }
// ];

export class MinimalFilterBar extends Component {
  constructor() {
    super();
    this.state = {
      countryList: [],
      stateList: [],
      cityList: [],
      country: "",
      state: "",
      city: "",
      countryLabel: "Select Country",
      countryLabelSuffixIcon: "../assets/icons/globe.svg",
      countryLabelSuffixIconEmoji: false,
      stateLabel: "Select State",
      cityLabel: "Select City"
    };
  }

  componentDidMount = () => {
    let _countryList = [];

    CountriesData.getCountries().forEach(country => {
      _countryList.push({
        label: country.name,
        value: country.shortName,
        suffixIcon: country.emoji,
        suffixIconEmoji: true
      });
    });

    this.setState({ countryList: _countryList });
  };

  selectedItem = (label, item) => {
    if (item.value !== "None") {
      let _itemValue =
        label === "country"
          ? CountriesData.getCountryInfoByShort(item.value)
          : "";

      this.setState({
        [label]: _itemValue,
        [label + "Label"]: item.label,
        [label + "LabelSuffixIcon"]: item.suffixIcon,
        [label + "LabelSuffixIconEmoji"]: true
      });
    }

    if (label === "country") {
      let _stateList = [];
      console.log(CountriesData.getStatesByShort(item.value));
      CountriesData.getStatesByShort(item.value).forEach(state => {
        _stateList.push({
          label: state.name,
          value: state.shortName,
          suffixIcon: "../assets/icons/city_pin.svg",
          suffixIconEmoji: false
        });
      });
      this.setState({ stateList: _stateList });
    }

    if (this.state.state !== "") {
      let _cityList = [];

      CountriesData.getCountries().forEach(country => {
        _cityList.push({
          label: country.name,
          value: country.shortName,
          suffixIcon: "../assets/icons/city_pin.svg",
          suffixIconEmoji: false
        });
      });
      this.setState({ cityList: _cityList });
    }
  };

  propertyTypeListSelected = propertyType => {
    console.log(propertyType);
  };

  render() {
    return (
      <div className="minimalFilterBar-wrapper">
        <div className="minimalFilterBar-select-wrapper">
          <DropDownList
            label={this.state.countryLabel}
            listItems={this.state.countryList}
            listClearance="90px"
            suffixIconEmoji={this.state.countryLabelSuffixIconEmoji}
            labelSuffixIcon={this.state.countryLabelSuffixIcon}
            labelSuffixIconWidth="15px"
            labelSuffixIconPadding="5px"
            dropDownListHeight="150px"
            itemSelected={v => this.selectedItem("country", v)}
          />

          <DropDownList
            label={this.state.stateLabel}
            listItems={
              this.state.stateList.length !== 0
                ? this.state.stateList
                : [{ label: "Select a country", value: "None" }]
            }
            listClearance="60px"
            labelSuffixIcon="../assets/icons/city_pin.svg"
            labelSuffixIconWidth="15px"
            labelSuffixIconPadding="5px"
            itemSelected={v => this.selectedItem("state", v)}
          />

          <DropDownList
            label={this.state.cityLabel}
            listItems={
              this.state.cityList.length !== 0
                ? this.state.cityList
                : [{ label: "Select a state", value: "None" }]
            }
            listClearance="60px"
            labelSuffixIcon="../assets/icons/city_pin.svg"
            labelSuffixIconWidth="15px"
            labelSuffixIconPadding="5px"
            itemSelected={v => this.selectedItem("city", v)}
          />
        </div>
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
        />
      </div>
    );
  }
}

export default MinimalFilterBar;
