import React, { Component } from "react";

class Total extends Component {
  render() {
    const sum = this.props.subTotal();
    if (this.props.cart.length === 0) return null;
    return (
      <div className="subtotal">
        <div id="total">Your Total : ₹ {sum.toFixed(2)}</div>
        <div className="clear-cart">
          <button id="empty-cart" onClick={() => this.props.onEmpty()}>
            Empty Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Total;
