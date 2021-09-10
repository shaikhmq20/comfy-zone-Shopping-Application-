import React, { Component } from "react";
import Header from "./header";
import Banner from "./banner";
import ProductsDisplay from "./productsDisplay";

class Home extends Component {
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
          cart={this.props.cart}
          onClicking={(product) => this.props.onClicking(product)}
        />
      </React.Fragment>
    );
  }
}

export default Home;
