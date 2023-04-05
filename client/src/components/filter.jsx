import {
  faFilter,
  faMobileScreenButton,
  faLaptop,
  faSprayCanSparkles,
  faHandDots,
  faPepperHot,
  faCouch,
  faFan,
  faShirt,
  faShoePrints,
  faClock,
  faBagShopping,
  faGem,
  faGlasses,
  faMotorcycle,
  faLightbulb,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

const icons = [
  faMobileScreenButton,
  faLaptop,
  faSprayCanSparkles,
  faHandDots,
  faPepperHot,
  faFan,
  faCouch,
  faShirt,
  faShirt,
  faShoePrints,
  faShirt,
  faShoePrints,
  faClock,
  faClock,
  faBagShopping,
  faGem,
  faGlasses,
  faCar,
  faMotorcycle,
  faLightbulb,
];

class Filter extends Component {
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

  getClassForListItem = (category) => {
    return this.props.category === category ? "filter-dropdown-active" : "filter-dropdown-item";
  }

  handleFilterClick = () => {
    let filterVisible = this.state.filterVisible;
    filterVisible = !filterVisible;
    this.setState({ filterVisible });
  };

  render() {
    return (
      <>
        <ul id={this.getIdForDropDown()}>
          {this.props.categories.map((category, index) => (
            <li
              key={index}
              onClick={() => this.props.history.push(`/${category}`)}
              className={this.getClassForListItem(category)}
            >
              <div class="filter-icons">
                <center>
                  <FontAwesomeIcon icon={icons[index]} />
                </center>
              </div>
              <div style={{ marginLeft: "5px" }}>
                {this.capitalize(category)}
              </div>
            </li>
          ))}
        </ul>
        <div id="filter-button" onClick={() => this.handleFilterClick()}>
          <FontAwesomeIcon icon={faFilter} size="xl" />
        </div>
      </>
    );
  }
}

export default Filter;
