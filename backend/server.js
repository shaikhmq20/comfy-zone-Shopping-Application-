const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { default: mongoose } = require("mongoose");

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  uri,
  () => {
    console.log("Connected to database");
  },
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const stockRouter = require("./routes/stocks");
app.use("/", stockRouter);

app.listen(port, () => {
  console.log(`The server is connected on ${port}`);
});
