import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          Comfy <span>Zone</span>
        </h1>
        <div id="cart">
          <div id="cart-logo">
            <i class="fas fa-shopping-cart fa-2x"></i>
            <div id="cart-items">0</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
