import React, { Component } from "react";

import CartItem from "./cartItem";
import Header from "./header";
import Total from "./total";
import { getCartItems, updateItem, deleteItem } from "../utils/cartUtil";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class CartDisplay extends Component {
  state = {
    cart: [],
    currentPage: 1,
    pageSize: 3,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    const cart = await getCartItems();
    this.setState({ cart });
  }

  async onIncrement(cprod) {
    const cart = [ ...this.state.cart ];
    const index = cart.indexOf(cprod);
    cart[index].count++;
    this.setState({ cart });
    await updateItem(cart[index]);
  }

  async onDecrement(cprod) {
    const cart = [ ...this.state.cart ];
    const index = cart.indexOf(cprod);
    if (cart[index].count > 1)
      cart[index].count--;
    else if (cart[index].count === 1)
      return await this.onRemove(cprod.id);
    this.setState({ cart });
    await updateItem(cart[index]);
  }

  async onRemove(id) {
    const cart = [ ...this.state.cart ].filter((cprod) => cprod.id !== id);
    this.setState({ cart });
    await deleteItem(id);
  }

  render() {
    const { currentPage, pageSize } = this.state;
    const cart = paginate(this.state.cart, currentPage, pageSize);

    if (this.state.cart.length === 0) {
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
          itemsCount={this.state.cart.length}
          onPageChange={(page) => this.handlePageChange(page)}
        />
        <div id="main">
          <div id="cart-items">
            {cart.map((cprod) => {
              return (
                <CartItem
                  cprod={cprod}
                  key={cprod.id}
                  onIncrement={() => this.onIncrement(cprod)}
                  onDecrement={() => this.onDecrement(cprod)}
                  onRemove={() => this.onRemove(cprod.id)}
                />
              );
            })}
          </div>
          <Total
            cart={this.state.cart}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
