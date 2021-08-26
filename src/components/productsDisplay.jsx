import React, { Component } from "react";
import Product from "./product";
import getProducts from "../products";

class ProductsDisplay extends Component {
  state = {
    products: getProducts(),
  };
  render() {
    return (
      <React.Fragment>
        <h3>Our Products</h3>
        <div id="products-container">
          {this.state.products.map((product) => {
            return <Product product={product} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductsDisplay;
