const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const url = dotenv.config().parsed.ATLAS_URL;
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

const cartRouter = require("./routes/cart");
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
