import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

class Counter extends Component {
  render() {
    return (
      <div className="counter">
        <div className="decrement">
          <button
            type="decrease"
            onClick={(cprod) => this.props.onDecrement(cprod)}
            disabled={this.props.cprod.count === 0}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="count">{this.props.cprod.count}</div>
        <div className="increment">
          <button
            type="increase"
            onClick={(cprod) => this.props.onIncrement(cprod)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
