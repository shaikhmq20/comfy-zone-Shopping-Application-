const mongoose = require("mongoose");
const { Product, productSchema} = require("./product.model");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const productsNotificationSchema = new Schema({
  altEmail: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  }
})

const UserSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  productsNotification: [productsNotificationSchema]
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id,Email:this.Email }, "user_jwt_token", {
    expiresIn: "8d",
  });
  return token;
};
const User = mongoose.model("users", UserSchema);
const validate = (data) => {
  const schema = Joi.object({
    Firstname: Joi.string().required().label("First Name"),
    Lastname: Joi.string().required().label("Last Name"),
    Email: Joi.string().email().required().label("Email"),
    Password: passwordComplexity().required().label("Password"),
    productsNotification: Joi.object().label("Products Notification")
  });
  return schema.validate(data);
};
module.exports = { User, validate };
