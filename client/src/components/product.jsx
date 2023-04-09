import React, { Component } from "react";
import { Link } from "react-router-dom";

import { addCartItem } from "../utils/cartUtil";
import Star from "./star";

class Product extends Component {
  async onClicking(item) {
    await addCartItem(item);
  }

  render() {
    const { thumbnail, title, price, rating, id } = this.props.product;
    return (
      <React.Fragment>
        <div className="product-container">
          <Link to={`/product/${id}`}>
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
              }}
            >
              {/* <img src={image[0]} alt="" /> */}
            </div>
          </Link>
          <center>
            <div className="product-name">{title}</div>
          </center>
          <Star rating={rating}></Star>
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
