import React, { Component } from "react";
import { Link } from "react-router-dom";

import { addCartItem } from "../utils/cartUtil";
import Star from "./star";
import { update } from "lodash";

class Product extends Component {
  async onClicking(item) {
    delete item["_id"]; 
    console.log("item",item);
    await addCartItem(item);
  }

  render() {
    const { thumbnail, title, price, rating, id} = this.props.product;
    const user_email=this.props.user_email;
    const user_id=this.props.user_id;
    //console.log(user);
    return (
      <React.Fragment>
        <div className="product-container">
          <Link to={`/product/${id}`}>
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
              }}
            >
              {/* <img src={image[0]} alt="" /> */}
            </div>
          </Link>
          <center>
            <div className="product-name">{title}</div>
          </center>
          <Star rating={rating}></Star>
          <div className="product-price">${price}</div>

          <span
            onClick={() => {
              var updated_products=this.props.product;
              updated_products["user_email"]=user_email;
              updated_products["user_id"]=user_id;
              this.onClicking(updated_products);
            }}
            className="add-to-cart"
          >
            <i id="add-to-cart" class="fas fa-shopping-cart"></i> ADD TO CART
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
