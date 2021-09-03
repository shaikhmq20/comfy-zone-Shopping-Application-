import React, { Component } from "react";
import CartItem from "./cartItem";
import Header from "./header";

class CartDisplay extends Component {
  state = {
    cart: this.props.cart,
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="cart-items">
          {this.state.cart.map((cprod) => {
            return <CartItem cprod={cprod} key={cprod.id} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
