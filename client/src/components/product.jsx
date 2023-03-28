import React, { Component } from "react";

import { addItem } from "../utils/cartUtil";

class Product extends Component {
  async onClicking(item) {
    await addItem(item);
  }

  render() {
    const { images: image, title: name, price } = this.props.product;
    return (
      <React.Fragment>
        <div className="product-container">
          <div
            className="product-image"
            style={{ backgroundImage: `url(${image[0]})`, backgroundSize: "cover"}}
          >
            {/* <img src={image[0]} alt="" /> */}
          </div>
          <div className="product-name">{name}</div>
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
