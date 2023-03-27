const router = require("express").Router();
const User = require("../models/User");


router.get("/data", (req, res) => {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(400).res.json(`Error:${err}`));
  });

router.post("/userExist", 
(req, res) => {
    const {   
     Email,
     Password
    } = req.body;
    console.log(req.body);
   User.findOne({ Email:Email ,Password:Password}, (err, data) => {
    if (data) {
     res.send({message:"Login Successfull"});
    } else {
      res.send({ message: "No such user" });
    }

    });
  });

  module.exports=router;
  