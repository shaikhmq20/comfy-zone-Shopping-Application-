import React, { Component } from "react";
import Header from "./header";
import Banner from "./banner";
import ProductsDisplay from "./productsDisplay";
import Filter from "./filter";
import axios from "axios";

class Home extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = [];
    await axios
      .get("https://dummyjson.com/products/?limit=100")
      .then((res) => res.data)
      .then((data) => {
        const { products } = data;
        for (let i = 0; i < products.length; i++)
          categories.push(products[i].category);

        let uniqueCategories = new Set(categories);
        this.setState({ categories: [...uniqueCategories] });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          darkMode={this.props.darkMode}
          toggleTheme={() => this.props.toggleTheme()}
        />
        <Banner />
        <ProductsDisplay
          products={this.props.products}
          // cart={this.props.cart}
          // onClicking={(product) => this.props.onClicking(product)}
        />
        <Filter />
      </React.Fragment>
    );
  }
}

export default Home;
