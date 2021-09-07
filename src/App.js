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

  // Event Handler to Add Item to Cart
  addItem = (product) => {
    const cart = this.state.cart;
    if (cart.find((prod) => product.name === prod.name) === undefined) {
      product.count += 1;
      cart.push(product);
    } else alert("Product already exists in your cart!😊");
    console.log(cart);
    this.setState({ cart });
  };

  // Event Handler to Increase Count of Product
  handleIncrement = (cprod) => {
    const cart = this.state.cart;
    for (const item of cart) {
      if (item.name === cprod.name) {
        item.count++;
      }
    }

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
          <CartDisplay
            cart={this.state.cart}
            product={this.state.products}
            onIncrement={(cprod) => this.handleIncrement(cprod)}
          />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
