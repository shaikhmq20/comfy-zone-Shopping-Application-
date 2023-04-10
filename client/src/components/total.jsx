import React, { Component } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes"
// import Razorpay from "razorpay";

import { getProductById, updateProductById } from "../utils/productUtil"

class Total extends Component {
  render() {
    const initPayment = (order_data) => {
      const options = {
        key: process.env.KEY_ID,
        amount: order_data.amount,
        currency: order_data.currency,
        description: "Test Transaction",
        order_id: order_data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:5000/api/payment/verify";
            const res = await axios.post(verifyUrl, { ...response, order_id: order_data.id });

            if (res.status === StatusCodes.OK) {
              for (let i = 0; i < this.props.cart.length; i++)
                handleStockUpdate(this.props.cart[i]);

              this.props.onEmpty();
            }

          } catch (error) {
            console.log("Response: ", { ...response, order_id: order_data.id });
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };

    const handlePayment = async (price) => {
      try {
        const orderUrl = "http://localhost:5000/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: price });
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleStockUpdate = async (cartProduct) => {
      const oldProduct = await getProductById(cartProduct.id);
      if (oldProduct.stock - cartProduct.count > 0)
        oldProduct.stock -= cartProduct.count;

      await updateProductById(oldProduct);
    }

    const sum = this.props.cart.reduce((sum, item) => {
      return sum + item.price[0] * item.count;
    }, 0);

    if (this.props.cart.length === 0) return null;

    return (
      <div className="subtotal">
        <div id="total">Your Total: ${sum.toFixed(2)}</div>
        <div className="clear-cart">
          <button id="empty-cart" onClick={() => this.props.onEmpty()}>
            Empty Cart
          </button>
          <button
            style={{ marginLeft: "12px" }}
            id="empty-cart"
            onClick={() => {
              handlePayment(Number(sum.toFixed(2) * 71));
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  }
}

export default Total;
