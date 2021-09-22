import React, { Component } from "react";

import CartItem from "./cartItem";
import Header from "./header";
import Total from "./total";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class CartDisplay extends Component {
  state = {
    currentPage: 1,
    pageSize: 3,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, pageSize } = this.state;
    const cart = paginate(this.props.cart, currentPage, pageSize);

    if (this.props.cart.length === 0) {
      return (
        <React.Fragment>
          <Header
            toggleTheme={() => this.props.toggleTheme()}
            darkMode={this.props.darkMode}
          />
          <p id="no-items">You have 0 items in your cart!</p>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header
          darkMode={this.props.darkMode}
          toggleTheme={() => this.props.toggleTheme()}
        />
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={this.props.cart.length}
          onPageChange={(page) => this.handlePageChange(page)}
        />
        <div id="main">
          <div id="cart-items">
            {cart.map((cprod) => {
              return (
                <CartItem
                  cprod={cprod}
                  key={cprod.id}
                  onIncrement={() => this.props.onIncrement(cprod)}
                  onDecrement={() => this.props.onDecrement(cprod)}
                  onRemove={() => this.props.onRemove(cprod)}
                />
              );
            })}
          </div>
          <Total
            cart={this.props.cart}
            subTotal={() => this.props.subTotal()}
            onEmpty={() => this.props.onEmpty()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
