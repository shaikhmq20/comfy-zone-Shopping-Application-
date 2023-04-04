import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
import axios from "axios";

class ProductsDisplay extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    await axios
      .get("https://dummyjson.com/products/?limit=100")
      .then((res) => res.data)
      .then((data) => this.setState({ products: data.products }));
  }

  filterProducts = (category) => {
    let products = [...this.state.products];
    products = this.state.products.filter((prod) => prod.category === category);

    return products;
  };

  checkCategory = (category) => {
    return this.props.categories.find((cat) => cat === category);
  };

  render() {
    const { products } = this.state;
    const { category } = this.props;
    console.log(category);
    let filteredProducts = [...products];

    if (this.checkCategory(category))
      filteredProducts = this.filterProducts(category);

    console.log(filteredProducts);

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
