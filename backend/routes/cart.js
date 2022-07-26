const router = require("express").Router();
const Cart = require("../models/cart.model");

router.get("/getCartItems", (req, res) => {
  Cart.find()
    .then((cart) => res.json(cart))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Cart.findOne({ id: req.params.id })
    .then((prod) => res.json(prod))
    .catch((err) => console.log(err));
});

router.post("/addToCart/:id", (req, res) => {
  const cart = {
    name: "Dresser",
    price: 320.99,
    image: "../images/img6 (Custom).jpg",
    id: 6,
    count: 0,
  };

  const newCart = new Cart(cart);

  newCart
    .save()
    .then(() => res.status(200).json("Done!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.post("/updateItem/:id", (req, res) => {
  console.log(req.body);
  Cart.findOneAndUpdate({ id: req.body.id }, req.body)
    .then(() => res.json("Done!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete("/deleteItem/:id", (req, res) => {
  Cart.findOneAndDelete({ id: req.params.id})
    .then(() => res.json("Done Deleting!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
})

module.exports = router;
