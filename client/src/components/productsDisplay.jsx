import React, { Component } from "react";
import Product from "./product";
import Cart from "./cart";
import _ from "lodash"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { getProducts } from "../utils/productUtil";

class ProductsDisplay extends Component {
  state = {
    products: [],
    sortVisibility: false,
    sortBy: "",
  };

  async componentDidMount() {
    // await axios
    //   .get("https://dummyjson.com/products/?limit=100")
    //   .then((res) => res.data)
    //   .then((data) => this.setState({ products: data.products }));
    const products = await getProducts();
    this.setState({ products });
  }

  filterProducts = (category) => {
    let products = [...this.state.products];
    products = this.state.products.filter((prod) => prod.category === category);
    return products;
  };

  checkCategory = (category) => {
    return this.props.categories.find((cat) => cat === category);
  };

  handleSortVisibility = () => {
    let sortVisibility = this.state.sortVisibility;
    sortVisibility = !sortVisibility;
    this.setState({ sortVisibility });
  }

  handleSortBy = (products) => {
    if (this.state.sortBy === "")
      return products;
    let sortedProducts = [...products];
    return _.orderBy(sortedProducts, this.state.sortBy, this.state.sortBy === "rating" ? "desc" : "asc");
  }

  render() {
    const { products } = this.state;
    const { category } = this.props;
    let filteredProducts = [...products];

    if (this.checkCategory(category))
      filteredProducts = this.filterProducts(category);

    filteredProducts = this.handleSortBy(filteredProducts);
    const sortVisibility = !this.state.sortVisibility ? { display: "none" } : {};

    return (
      <React.Fragment>
        <h3>Our Products</h3>
        <div className="sort">
          <button className="sort-icon" onClick={() => this.handleSortVisibility()}>
            <FontAwesomeIcon icon={faArrowUpWideShort} /> SORT BY
            <ul className="sort-dropdown" style={sortVisibility}>
              <li onClick={() => this.setState({ sortBy: "price" })}>Price</li>
              <li onClick={() => this.setState({ sortBy: "rating" })}>Rating</li>
            </ul>
          </button>
        </div>
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
