import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCartItems, getCartSize, getuser } from "../utils/cartUtil";
import CartItem from "./cartItem";
import { withRouter } from "react-router-dom";


class Cart extends Component {
  state = {
    size: 0,
  };


  async componentDidMount() {
    const decode = (token) => JSON.parse(atob(token.split('.')[1]));
    const token=localStorage.getItem("token");
    if(token==undefined || token==null){
      alert("Error: kindly login to the site");
      this.props.history.push("/");
      window.location.replace("/");
     
    }
    var decoded_token=decode(token);
   
    var user_id=String(decoded_token["_id"]);
    var data = await getCartItems(user_id);
    const size=data.length;
   
    this.setState({ size });
  }

  render() {
    return (
      <div id="cart">
        <div id="cart-logo">
          <Link to="/yourCart">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </Link>
          <div id="cart-items-size">{this.state.size}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cart);
