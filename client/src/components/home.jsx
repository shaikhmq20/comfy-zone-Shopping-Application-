import React, { Component } from "react";
import Header from "./header";
import Banner from "./banner";
import ProductsDisplay from "./productsDisplay";
import Filter from "./filter";
import axios from "axios";

class Home extends Component {
  state = {
    category: this.props.match.params.category,
    categories: [],
    usertoken:""
  };

  async componentDidMount() {
    const categories = [];
    const decode = (token) => JSON.parse(atob(token.split('.')[1]));
    const token=localStorage.getItem("token");
    var decoded_token=decode(token);
    this.setState({usertoken:decoded_token});
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category)
      this.setState({ category: this.props.match.params.category });
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
          usertoken={this.state.usertoken}
          products={this.props.products}
          categories={this.state.categories}
          category={this.state.category}
          {...this.props}
        // cart={this.props.cart}
        // onClicking={(product) => this.props.onClicking(product)}
        />
        <div id="filter">
          <Filter {...this.props} category={this.state.category} categories={this.state.categories} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
