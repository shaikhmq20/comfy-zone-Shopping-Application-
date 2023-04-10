import React, { Component } from "react";

import CartItem from "./cartItem";
import Header from "./header";
import Total from "./total";
import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItem,
  
} from "../utils/cartUtil";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class CartDisplay extends Component {
  state = {
    cart: [],
    user_id:"",
    currentPage: 1,
    pageSize: 3,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  async componentDidMount() {
    const decode = (token) => JSON.parse(atob(token.split('.')[1]));
    const token=localStorage.getItem("token");
    var decoded_token=decode(token);
   
    var user_id=String(decoded_token["_id"]);
    this.setState({user_id});
    var cart = await getCartItems(user_id);
    //cart=cart.filter((cartitem)=>cartitem.user_id==user_id);
    this.setState({ cart });
  }

  async handleIncrement(cprod) {
    const cart = [...this.state.cart];
    const index = cart.indexOf(cprod);
    cart[index].count++;
    this.setState({ cart });
    await updateCartItem(cart[index]);
  }

  async handleDecrement(cprod) {
    const cart = [...this.state.cart];
    const index = cart.indexOf(cprod);
    if (cart[index].count > 1) cart[index].count--;
    else if (cart[index].count === 1)
      return await this.handleCartItemDelete(cprod.id,cprod.user_id);
    this.setState({ cart });
    await updateCartItem(cart[index]);
  }

  async handleCartItemDelete(id,user_id) {
    const cart = [...this.state.cart].filter((cprod) => (cprod.id !== id ));
    this.setState({ cart });
    await deleteCartItem(id,user_id);
  }

  async handleCartEmpty(user_id) {
    const cart = [];
    this.setState({ cart });
    await deleteAllCartItem(user_id);
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
                  onIncrement={() => this.handleIncrement(cprod)}
                  onDecrement={() => this.handleDecrement(cprod)}
                  onRemove={() => this.handleCartItemDelete(cprod.id,cprod.user_id)}
                />
              );
            })}
          </div>
          <Total
            cart={this.state.cart}
            onEmpty={() => this.handleCartEmpty(this.state.user_id)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CartDisplay;
