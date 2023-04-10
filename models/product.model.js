const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: Number,
    title: String,
    description: {
      type: String,
      maxLength: 500,
    },
    price: {
      type: [Number],
      require: true,
      min: 0
    },
    discountPercentage: {
      type: Number,
      require: true,
      min: 0,
      max: 100
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
      max: 5.00,
    },
    stock: Number,
    brand: {
      type: String,
      maxLength: 100,
    },
    category: {
      type: String,
      maxLength: 50,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true
    },
    images: {
      type: [String],
      require: true,
    }
  }
)

const Product = mongoose.model("product", productSchema);
module.exports = Product;