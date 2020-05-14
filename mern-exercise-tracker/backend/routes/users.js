const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

//READ
//http://localhost:5000/users/
router.route("/").get((req, res) => {
  //We call Users.find() to get a list of all the
  //users from the DB
  User.find()
    //The find method returns a promise.
    //The results are returned in JSON format
    //with res.json(users).
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//CREATE
router.route("/").post((req, res) => {
  //The username is part of the request body.
  const username = req.body.username;
  //After getting the username,
  //we create a new instance of User.
  const newUser = new User({ username });
  //Finally, the new user is saved to the DB
  //with the save() method and we return “User added!”
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
