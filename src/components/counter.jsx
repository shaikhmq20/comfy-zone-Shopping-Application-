import React, { Component } from "react";

class Counter extends React.Component {
  render() {
    return (
      <div className="counter">
        <div className="decrement">
          <button type="decrease" onClick={() => this.handleDecrement()}>
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
