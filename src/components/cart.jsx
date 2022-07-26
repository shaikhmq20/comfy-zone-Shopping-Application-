import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCartSize } from "../utils/cartUtil";

class Cart extends Component {
  state = {
    size: 0,
  };

  async componentDidMount() {
    const size = await getCartSize();
    this.setState({ size });
  }

  render() {
    console.log(this.props.size);
    return (
      <div id="cart">
        <div id="cart-logo">
          <Link to="/yourCart">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </Link>
          <div id="cart-items-size">{this.state.size}</div>
        </div>
      </div>
    );
  }
}

export default Cart;
