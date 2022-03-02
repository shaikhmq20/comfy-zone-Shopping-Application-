const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  id: Number,
  numberInStock: Number,
});

const stockModel = mongoose.model("stocks", stockSchema);

module.exports = stockModel;
