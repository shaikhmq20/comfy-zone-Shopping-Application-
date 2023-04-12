const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/getUser", (req, res) => {
  const { _id } = req.body;
  User.findById(_id)
    .then((user) => res.json(user))
    .catch((err) => res.json(`Err: ${err}`));
});

router.get("/getAllUsers", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`Err: ${err}`));
});

router.put("/updateUser", (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(_id, req.body)
    .then(() => res.json("User updated Successfully!"))
    .catch((err) => res.json(`Err: ${err}`));
});

router.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ Email: req.body.Email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(10));
    const hashPassword = await bcrypt.hash(req.body.Password, salt);

    await new User({ ...req.body, Password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
