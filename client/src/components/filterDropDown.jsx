import React, { Component } from "react";

class FilterDropDown extends Component {
  capitalize = (word) => {
    let firstLetter = word.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + word.slice(1);
  };

  render() {
    return (
      <ul id="filter-dropdown">
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
