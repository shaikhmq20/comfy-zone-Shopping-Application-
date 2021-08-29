import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cart extends Component {
  render() {
    return (
      <div id="cart">
        <div id="cart-logo">
          <Link to="/yourCart">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </Link>
          <div id="cart-items">{this.props.cart.length}</div>
        </div>
      </div>
    );
  }
}

export default Cart;
