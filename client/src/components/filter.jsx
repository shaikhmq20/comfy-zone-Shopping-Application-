import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div id="filter-button">
        <FontAwesomeIcon icon={faFilter} size="xl" />
      </div>
    );
  }
}

export default Filter;
