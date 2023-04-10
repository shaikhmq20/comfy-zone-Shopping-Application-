const mongoose = require("mongoose");
const Products = require("./models/product.model");

const url =
  "mongodb+srv://qasimsk2012:vscode2020@cluster0.igg5d08.mongodb.net/comfy-zone";
mongoose.connect(url, () => console.log("Connected to db!"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Products.find().then((products) => {
  const jsonString = JSON.stringify(products);
  
  const fs = require('fs');
  fs.writeFile("products.json", jsonString, "utf-8", (err) => {
    if (err)
      console.log(err);
    else
      console.log("Success!");
  })
});
