import React, { Component } from "react";
import Counter from "./counter";

class CartItem extends Component {
  render() {
    const { image, name, price } = this.props.cprod;

    return (
      <div className="cart-item">
        <div className="item-image product-image">
          <img src={image} alt={name} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-price">$ {price}</div>
          <div className="item-count">
            <Counter
              cprod={this.props.cprod}
              onIncrement={(cprod) => this.props.onIncrement(cprod)}
              onDecrement={(cprod) => this.props.onDecrement(cprod)}
            />
          </div>
          <div className="remove-item">
            <button
              className="remove-btn"
              onClick={(cprod) => this.props.onRemove(cprod)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
