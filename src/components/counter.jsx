import React, { Component } from "react";

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
            -
          </button>
        </div>
        <div className="count">{this.props.cprod.count}</div>
        <div className="increment">
          <button
            type="increase"
            onClick={(cprod) => this.props.onIncrement(cprod)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
