import React, { Component } from "react";
import Counter from "./counter";

class CartItem extends Component {
  render() {
    const { image, name, price } = this.props.cprod;

    return (
      <div className="cart-item">
        <div className="item-image">
          <img src={image} alt={name} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-price">$ {price}</div>
          <div className="item-count">
            <Counter
              cprod={this.props.cprod}
              onIncrement={(cprod) => this.props.onIncrement(cprod)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
