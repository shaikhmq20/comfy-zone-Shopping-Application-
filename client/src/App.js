import React, { Component } from "react";
import Home from "./components/home";
import CartDisplay from "./components/cartDisplay";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import getProducts from "./products";

class App extends Component {
  state = {
    products: getProducts(),
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

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              products={this.state.products}
              darkMode={this.state.darkMode}
              toggleTheme={() => this.toggleDarkMode()}
              {...props}
            />
          )}
        />
        <Route
          path="/:category"
          exact
          render={(props) => (
            <Home
              products={this.state.products}
              darkMode={this.state.darkMode}
              toggleTheme={() => this.toggleDarkMode()}
              {...props}
            />
          )}
        />
        {/* <Home
            products={this.state.products}
            darkMode={this.state.darkMode}
            toggleTheme={() => this.toggleDarkMode()}
          />
        </Route> */}
        <Route path="/yourCart">
          <CartDisplay
            darkMode={this.state.darkMode}
            product={this.state.products}
            toggleTheme={() => this.toggleDarkMode()}
          />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
