const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express(); 

const url = process.env.ATLAS_URL || dotenv.config().parsed.ATLAS_URL;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  url,
  () => {
    console.log("Connected to db");
  },
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.static(path.join(__dirname, "client/build")));

const cartRouter = require("./routes/cart");
app.use("/api/cart", cartRouter);
/*const LoginRouter =require("./routes/login");
app.use("/api/login",LoginRouter);*/
const userRoutes=require("./routes/users");
app.use("/api/user",userRoutes);
const authRoutes=require("./routes/auth");
app.use("/api/auth",authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
