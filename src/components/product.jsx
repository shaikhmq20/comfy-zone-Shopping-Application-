import React, { Component } from "react";
import axios from "axios";
class Product extends Component {
  state = {
    numberInStock: 2,
  };

  getNumberInStock() {
    axios
      .get("http://localhost:5000/" + this.props.product.id)
      .then((res) => {
        const productsStock = res.data;
        this.setState({ numberInStock: productsStock.numberInStock });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getNumberInStock();
  }

  componentDidUpdate() {
    this.getNumberInStock();
  }

  render() {
    const { image, name, price } = this.props.product;
    return (
      <React.Fragment>
        <div className="product-container">
          <div className="product-image">
            <img src={image} alt={name} />
            <div className="number-in-stock">
              In Stock: {this.state.numberInStock}
            </div>
          </div>
          <div className="product-name">{name}</div>
          <div className="product-price">₹ {price}</div>
          <span onClick={() => this.props.onClicking()} className="add-to-cart">
            <i id="add-to-cart" class="fas fa-shopping-cart"></i> ADD TO CART
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
