import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
class ProductsDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <h3>Our Products</h3>
        <div id="products-container">
          {this.props.products.map((product) => {
            return (
              <Product
                product={product}
                key={product.id}
              />
            );
          })}
        </div>
        <Cart/>
      </React.Fragment>
    );
  }
}

export default ProductsDisplay;
