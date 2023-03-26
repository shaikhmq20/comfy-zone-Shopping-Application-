import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
import axios from "axios";

class ProductsDisplay extends Component {
  state = {
    category: "",
    products: [],
  };

  async componentDidMount() {
    this.setState({ category: this.props.match.params.category })
    const products = await axios
      .get("https://dummyjson.com/products/?limit=100")
      .then((res) => res.data)
      .then((data) => this.setState({ products: data.products }));
  }

  filterProducts = (category) => {
    let products = [...this.state.products];
    if (this.state.category)
      products = this.state.products.filter(
        (prod) => prod.category === this.state.category
      );

    return products;
  };

  checkCategory = (category) => {
    return this.props.categories.find((cat) => cat === category);
  };

  render() {
    const { products, category } = this.state;
    let filteredProducts = [...products];

    if (this.checkCategory(category))
      filteredProducts = this.filterProducts(category);

    return (
      <React.Fragment>
        <h3>Our Products</h3>
        <div id="products-container">
          {filteredProducts.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        <Cart />
      </React.Fragment>
    );
  }
}

export default ProductsDisplay;
