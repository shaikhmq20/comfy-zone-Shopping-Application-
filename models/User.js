const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
 
});
module.exports = User = mongoose.model("users", UserSchema);