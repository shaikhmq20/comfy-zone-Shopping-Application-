import React, { Component } from "react";

class CartItem extends Component {
  render() {
    const { image, name, price } = this.props.cprod;

    return (
      <div className="cart-item">
        <div className="item-image">
          <img src={image} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-price">$ {price}</div>
        </div>
      </div>
    );
  }
}

export default CartItem;
