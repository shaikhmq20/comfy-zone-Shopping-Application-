import React, { Component } from "react";
import CartItem from "./cartItem";
import Header from "./header";

class CartDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="cart-items">
          {this.props.cart.map((cprod) => {
            return (
              <CartItem
                cprod={cprod}
                key={cprod.id}
                onIncrement={() => this.props.onIncrement(cprod)}
                onDecrement={() => this.props.onDecrement(cprod)}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
