import React, { Component } from "react";

import Header from "./header";
import Cart from "./cart";
import Star from "./star";
import { getProductById } from "../utils/productUtil";

export default class ProductsDetail extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const product = await getProductById(this.props.match.params.id);
    console.log(product);
    this.setState({ product });
  }

  getWidth = () => {
    return document.getElementsByClassName("product-detail-image").offsetWidth - 20;
  };

  render() {
    if (typeof this.state.product === "string" || !this.state.product)
      this.props.history.push("/home");

    const { thumbnail, title, description, rating, price, stock } =
      this.state.product;
    return (
      <>
        <Header />
        <div className="product-detail-container">
          <img className="product-detail-image" src={thumbnail} alt={title} />
          <div
            className="product-detail-description"
            style={{
              width: this.getWidth(),
            }}>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>${price}</span>
            <Star rating={rating} />
            <div className="product-detail-stock">
              <span className="badge">Stock: {stock}</span>
            </div>
          </div>
        </div>
        <Cart />
      </>
    );
  }
}