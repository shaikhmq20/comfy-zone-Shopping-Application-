import React, { useEffect, useRef, useState } from "react";
import { Modal, Box } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    fontWeight: "500",
    backgroundColor: "#e7e2dd",
    height: "50%",
    borderRadius: 8,
    boxShadow: "5px 5px 20px #3f3f3f",
    padding: 20,
  },
};

function Graph({ modalOpen, onModalClose, price }) {
  const windowRef = useRef(null);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  useEffect(() => {
    windowRef.current = window;
    const handleResize = () => {
      setViewWidth(windowRef.current.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const getBoxWidth = () => {
    if (viewWidth < 768) return "100%";

    return "50%";
  };

  for (let i = 0; i < data.length; i++) data[i].price = price[i];

  return (
    <Modal
      open={modalOpen}
      style={styles.modal}
      onClose={() => onModalClose()}
      aria-labelledby={"Price Graph"}
      aria-describedby={
        "A line plot for the different prices for the given particular product"
      }>
      <Box style={styles.box} width={getBoxWidth()}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={data}>
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
        </ResponsiveContainer>
      </Box>
    </Modal>
  );
}

// class Graph extends Component {
//   state = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   }
//
//   render() {
//     const {modalOpen, onModalClose, price} = this.props;
//     for (let i = 0; i < data.length; i++) data[i].price = price[i];
//
//     const {width, height} = this.state;
//     console.log(width, height);
//     return (
//       <Modal
//         open={modalOpen}
//         style={styles.modal}
//         onClose={() => onModalClose()}
//         aria-labelledby={"Price Graph"}
//         aria-describedby={
//           "A line plot for the different prices for the given particular product"
//         }>
//         <Box style={styles.box}>
//           <LineChart width={width / 2} height={height / 2} data={data}>
//             <XAxis dataKey="month"/>
//             <YAxis/>
//             <CartesianGrid strokeDasharray="3 3"/>
//             <Tooltip/>
//             <Legend/>
//             <Line
//               type="monotone"
//               dataKey="price"
//               stroke="#ee6c4d"
//               activeDot={{r: 7}}
//             />
//           </LineChart>
//         </Box>
//       </Modal>
//     );
//   }
// }

export default Graph;
