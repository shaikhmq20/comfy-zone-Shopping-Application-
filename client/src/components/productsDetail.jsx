import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { validate } from "email-validator";
import axios from "axios";

import Header from "./header";
import Cart from "./cart";
import Star from "./star";
import { getProductById } from "../utils/productUtil";
import Graph from "./graph";
import { StatusCodes } from "http-status-codes";

export default class ProductsDetail extends Component {
  state = {
    product: {},
    price: [],
    images: [],
  };

  styles = {
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      backgroundColor: "#e7e2dd",
      height: "100px",
      borderRadius: 8,
      boxShadow: "5px 5px 20px #3f3f3f",
      padding: 20,
    },
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

  handleGraphModalClose = () => {
    this.setState({ graphModalOpen: false });
  };

  handleGraphModalOpen = () => {
    this.setState({ graphModalOpen: true });
  };

  handleNotification = async () => {
    const email = prompt("Enter the email");
    const price = prompt("Enter the price");
    const isValidEmail = validate(email);
    if (price < 0) {
      alert("Please enter a valid price!");
      return;
    }
    if (!isValidEmail) {
      alert("Please enter a valid email!");
      return;
    }
    console.log(this.state.product);
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(window.atob(base64));
    const response = await axios
      .post(`${window.location.origin}/api/user/getUser`, payload)
      .then((res) => res)
      .catch((err) => console.log(err));

    if (response.status === StatusCodes.OK) {
      const oldUser = response.data;
      const { id } = this.state.product;
      const found = oldUser.productsNotification.find((obj) => obj.id === id);
      if (found) {
        alert("Product already added for notification!");
        return;
      }
      oldUser.productsNotification.push({ altEmail: email, id, price });
      await axios
        .put(`${window.location.origin}/api/user/updateUser`, oldUser)
        .then((res) => {
          if (res.status === StatusCodes.OK)
            alert("Product successfully added!");
          else alert("Internal Server error!");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    if (
      this.state.product === null ||
      typeof this.state.product === "string" ||
      this.state.product === undefined
    )
      return <Redirect to="/home" />;

    const { thumbnail, title, description, rating, stock } = this.state.product;
    const { price, graphModalOpen } = this.state;

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
              onClick={() => this.handleGraphModalOpen()}>
              Generate Price Graph
            </button>
            <div className={"price-notification"}>
              <span
                className={"badge"}
                title={"Notification for Price drop"}
                onClick={() => this.handleNotification()}
                style={{
                  cursor: "pointer",
                }}>
                <FontAwesomeIcon icon={faBell} />
              </span>
            </div>
          </div>
          <Graph
            modalOpen={graphModalOpen}
            onModalClose={() => this.handleGraphModalClose()}
            price={price}
          />
        </div>
        <Cart />
      </>
    );
  }
}
