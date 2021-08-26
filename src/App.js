import React, { Component } from "react";
import Header from "./components/header";
import Banner from "./components/banner";
import ProductsDisplay from "./components/productsDisplay";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Banner />
        <ProductsDisplay />
      </React.Fragment>
    );
  }
}

export default App;
