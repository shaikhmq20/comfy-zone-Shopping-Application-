import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "./header";
import Cart from "./cart";
import Star from "./star";
import { getProductById } from "../utils/productUtil";
import Graph from "./graph";

export default class ProductsDetail extends Component {
  state = {
    product: {},
    price: [],
    images: [],
    modalOpen: false,
  };

  async componentDidMount() {
    console.log(this.props.match.params.id);
    await getProductById(this.props.match.params.id).then((product) => {
      this.setState({ product, price: product.price, images: product.images });
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const product = await getProductById(this.props.match.params.id);
      this.setState({ product });
    }
  }

  getWidth = () => {
    return (
      document.getElementsByClassName("product-detail-image").offsetWidth - 20
    );
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  render() {
    if (
      this.state.product === null ||
      typeof this.state.product === "string" ||
      this.state.product === undefined
    )
      return <Redirect to="/home" />;

    const { thumbnail, title, description, rating, stock } = this.state.product;
    const { price } = this.state;

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
            <span>
              <strong>${price[0]}</strong>
            </span>
            <Star rating={rating} />
            <div className="product-detail-stock">
              <span className="badge">Stock: {stock}</span>
            </div>
            <button
              className="buttons"
              style={{
                marginTop: 20,
              }}
              onClick={() => this.handleModalOpen()}>
              Generate Price Graph
            </button>
          </div>
          <Graph
            modalOpen={this.state.modalOpen}
            onModalClose={() => this.handleModalClose()}
            price={price}
          />
        </div>
        <Cart />
      </>
    );
  }
}
