import React, { Component } from "react";

class FilterDropDown extends Component {
  state = {
    filterVisible: false,
  };

  capitalize = (word) => {
    let firstLetter = word.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + word.slice(1);
  };

  getIdForDropDown = () => {
    return this.state.filterVisible
      ? "filter-dropdown"
      : "filter-dropdown-hidden";
  };

  render() {
    return (
      <ul id={this.getIdForDropDown()}>
        {this.props.categories.map((category, index) => (
          <li
            key={index}
            onClick={() => this.props.history.push(`/${category}`)}
          >
            {this.capitalize(category)}
          </li>
        ))}
      </ul>
    );
  }
}

export default FilterDropDown;
