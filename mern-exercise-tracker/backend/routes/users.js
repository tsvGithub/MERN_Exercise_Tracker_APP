const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

//READ
//http://localhost:5000/users/
router.route("/").get((req, res) => {
  // Users.find() gets all users from the DB
  User.find()
    //The find method returns a promise.
    //The results are returned in JSON format
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
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
