import React, { Component } from "react";
import CartItem from "./cartItem";
import Header from "./header";

class CartDisplay extends Component {
  render() {
    if (this.props.cart.length === 0) {
      return (
        <React.Fragment>
          <Header />
          <p id="no-items">You have 0 items in your cart!</p>
        </React.Fragment>
      );
    }
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
                onRemove={() => this.props.onRemove(cprod)}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
