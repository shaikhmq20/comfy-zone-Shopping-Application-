import React, { Component } from "react";

import { addItem } from "../utils/cartUtil";

class Product extends Component {
  async onClicking(item) {
    await addItem(item);
  }

  render() {
    const { thumbnail, title, price } = this.props.product;
    return (
      <React.Fragment>
        <div className="product-container">
          <div
            className="product-image"
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
            }}
          >
            {/* <img src={image[0]} alt="" /> */}
          </div>
          <div className="product-name">{title}</div>
          <div className="product-price">${price}</div>
          <span
            onClick={() => {
              this.onClicking(this.props.product);
            }}
            className="add-to-cart"
          >
            <i id="add-to-cart" class="fas fa-shopping-cart"></i> ADD TO CART
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
