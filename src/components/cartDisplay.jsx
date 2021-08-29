import React, { Component } from "react";
import Cart from "./cart";
import Header from "./header";

class CartDisplay extends Component {
  state = {
    cart: this.props.cart,
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <Cart cart={this.state.cart} />
        <div id="cart-container">
          {this.state.cart.map((product) => {
            return <p>{product.name}</p>;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
