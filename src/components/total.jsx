import React, { Component } from "react";

class Total extends React.Component {
  render() {
    const sum = this.props.subTotal();
    if (this.props.cart.length === 0) return null;
    return (
      <div className="subtotal">
        <div id="total">Your Total : $ {sum.toFixed(2)}</div>
        <div className="clear-cart">
          <button className="buttons" onClick={() => this.props.onEmpty()}>
            Empty Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Total;
