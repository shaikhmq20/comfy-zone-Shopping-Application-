import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/home";
import CartDisplay from "./components/cartDisplay";
import getProducts from "./products";
import { updateStockForId } from "./utils/stockDetails";

class App extends Component {
  state = {
    products: getProducts(),
    cart:
      JSON.parse(localStorage.getItem("cart")) === null
        ? []
        : JSON.parse(localStorage.getItem("cart")),
    darkMode: false,
  };

  toggleDarkMode = () => {
    let root = document.documentElement;
    let darkMode = this.state.darkMode;

    if (!darkMode) {
      root.style.setProperty("--background", "#3f3f3f");
      root.style.setProperty("--text-color", "#fff");
      root.style.setProperty("--cart-bg", "#676767");
      darkMode = !darkMode;
      this.setState({ darkMode });
    } else {
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--text-color", "#000");
      root.style.setProperty("--cart-bg", "#e9e8e7");
      darkMode = !darkMode;
      this.setState({ darkMode });
    }
  };

  // Event Handler to Add Item to Cart
  addItem = async (product) => {
    const cart = this.state.cart;
    if (cart.find((prod) => product.name === prod.name) === undefined) {
      if (product.count === 0) {
        product.count++;
      }

      cart.push(product);
      updateStockForId(product.id, 1, false);
    } else alert("Product already exists in your cart!😊");
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
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

    updateStockForId(cprod.id, 1, false);

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleDecrement = (cprod) => {
    let cart = this.state.cart;
    for (const item of cart) {
      if (item.name === cprod.name) {
        item.count--;
      }
    }

    updateStockForId(cprod.id, 1, true);

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleRemove = (cprod) => {
    const cart = this.state.cart.filter((prod) => prod.name !== cprod.name);
    updateStockForId(cprod.id, cprod.count, true);
    cprod.count = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  subTotal = () => {
    let sum = 0;
    for (const item of this.state.cart) {
      sum += item.count * item.price;
    }

    return sum;
  };

  emptyCart = () => {
    let cart = this.state.cart;
    for (const item of cart) {
      updateStockForId(item.id, item.count, true);
      item.count = 0;
    }
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
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
            darkMode={this.state.darkMode}
            toggleTheme={() => this.toggleDarkMode()}
          />
        </Route>
        <Route path="/yourCart">
          <CartDisplay
            cart={this.state.cart}
            darkMode={this.state.darkMode}
            product={this.state.products}
            onIncrement={(cprod) => this.handleIncrement(cprod)}
            onDecrement={(cprod) => this.handleDecrement(cprod)}
            onRemove={(cprod) => this.handleRemove(cprod)}
            subTotal={() => this.subTotal()}
            onEmpty={() => this.emptyCart()}
            toggleTheme={() => this.toggleDarkMode()}
          />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
