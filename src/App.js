import React, { Component } from "react";
import Home from "./components/home";
import CartDisplay from "./components/cartDisplay";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import getProducts from "./products";

class App extends Component {
  state = {
    products: getProducts(),
    cart: [],
  };

  addItem = (product) => {
    const cart = this.state.cart;
    cart.push(product);
    console.log(cart);
    this.setState({ cart });
  };

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact>
          <Home
            cart={this.state.cart}
            products={this.state.products}
            onClicking={(product) => this.addItem(product)}
          />
        </Route>
        <Route path="/yourCart">
          <CartDisplay cart={this.state.cart} product={this.state.products} />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
