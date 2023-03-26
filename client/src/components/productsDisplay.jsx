import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
import axios from "axios";

class ProductsDisplay extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const products = await axios
      .get("https://dummyjson.com/products/?limit=100")
      .then((res) => res.data)
      .then((data) => this.setState({ products: data.products }));
  }

  render() {
    return (
      <React.Fragment>
        <h3>Our Products</h3>
        <div id="products-container">
          {this.state.products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        <Cart />
      </React.Fragment>
    );
  }
}

export default ProductsDisplay;
