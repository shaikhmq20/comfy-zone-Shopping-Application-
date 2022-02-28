import React, { Component } from "react";

class Product extends Component {
  render() {
    const { image, name, price } = this.props.product;
    return (
      <React.Fragment>
        <div className="product-container">
          <div className="product-image">
            <img src={image} alt="" />
          </div>
          <div className="product-name">{name}</div>
          <div className="product-price">₹ {price}</div>
          <span onClick={() => this.props.onClicking()} className="add-to-cart">
            <i id="add-to-cart" class="fas fa-shopping-cart"></i> ADD TO CART
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
