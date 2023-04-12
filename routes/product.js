const router = require("express").Router();
const { Product } = require("../models/product.model");

router.get("/getProducts", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.json(`Err: ${err}`));
});

router.get("/getProduct/:id", (req, res) => {
  Product.findOne({ id: req.params.id })
    .then((product) => res.json(product))
    .catch((err) => res.json(`Err: ${err}`));
});

router.put("/updateProduct/:id", (req, res) => {
  Product.findOneAndUpdate({ id: req.params.id }, req.body)
    .then(() => res.json("Updated Product Sucessfully!"))
    .catch((err) => res.json(`Err: ${err}`));
});

module.exports = router;
