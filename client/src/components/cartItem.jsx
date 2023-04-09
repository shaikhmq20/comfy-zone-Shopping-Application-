import React, { Component } from "react";
import { Link } from "react-router-dom";

import Counter from "./counter";

class CartItem extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props.cprod;

    return (
      <Link to={`/product/${id}`} style={{
        textDecoration: "none",
      }}>
        <div className="cart-item">
          <div
            className="item-image"
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              borderRadius: "8px",
            }}
          >
            {/* <img src={images[0]} alt={title} /> */}
          </div>
          <div className="item-details">
            <div className="item-name">{title}</div>
            <div className="item-price">${price}</div>
            <div id="response">
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
                  onClick={(cprod) => this.props.onRemove(cprod.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default CartItem;
