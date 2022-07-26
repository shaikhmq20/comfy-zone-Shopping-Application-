import React, { Component } from "react";

class Total extends Component {
  render() {
    const sum = this.props.cart.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);
    if (this.props.cart.length === 0) return null;
    return (
      <div className="subtotal">
        <div id="total">Your Total : ₹ {sum.toFixed(2)}</div>
        <div className="clear-cart">
          <button id="empty-cart">
            Empty Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Total;
