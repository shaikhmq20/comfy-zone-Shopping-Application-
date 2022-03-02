const router = require("express").Router();
const stockModel = require("../models/stocks.model");

router.get("/:id", (req, res) => {
  stockModel
    .find({ id: req.params.id })
    .then((stocks) => res.json(stocks[0]))
    .catch((err) => console.log(err));
});

router.post("/updateStock/:id", (req, res) => {
  console.log(req.body);
  stockModel
    .findOneAndUpdate({ id: req.params.id }, req.body)
    .then(() => res.json("Stocks updated"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
