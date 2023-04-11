import React, { Component } from "react";
import { Modal, Box } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", price: 10 },
  { month: "Feb", price: 10 },
  { month: "Mar", price: 15 },
  { month: "Apr", price: 25 },
  { month: "May", price: 30 },
  // { month: "June", price: 35 },
  // { month: "July", price: 28 },
];

const styles = {
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "#e7e2dd",
    width: "50%",
    height: "50%",
    borderRadius: 8,
    boxShadow: "0 0 10px #e7e2dd"
  },
};

class Graph extends Component {
  render() {
    const { modalOpen, onModalClose, price } = this.props;
    for (let i = 0; i < data.length; i++)
      data[i].price = price[i];

    // console.log(product.price[0]);
    return (
      <Modal
        open={modalOpen}
        style={styles.modal}
        onClose={() => onModalClose()}
        aria-labelledby={"Price Graph"}
        aria-describedby={
          "A line plot for the different prices for the given particular product"
        }>
        <Box style={styles.box}>
          {/*<Typography variant={"h6"} component={"h2"}>*/}
          {/*  Hello*/}
          {/*</Typography>*/}
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ee6c4d"
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </Box>
      </Modal>
    );
  }
}

export default Graph;
