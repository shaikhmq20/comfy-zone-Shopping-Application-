import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

class Filter extends Component {
  state = {
    filterVisible: false,
  }

  capitalize = (word) => {
    let firstLetter = word.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    return firstLetter + word.slice(1);
  };

  getIdForDropDown = () => {
    return this.state.filterVisible ? "filter-dropdown" : "filter-dropdown-hidden";
  }

  handleFilterClick = () => {
    let filterVisible = this.state.filterVisible;
    filterVisible = !filterVisible;
    this.setState({ filterVisible });
  }

  render() {
    return (
      <>
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
        <div
          id="filter-button"
          onClick={() => this.handleFilterClick()}
        >
          <FontAwesomeIcon icon={faFilter} size="xl" />
        </div>
      </>
    );
  }
}

export default Filter;
