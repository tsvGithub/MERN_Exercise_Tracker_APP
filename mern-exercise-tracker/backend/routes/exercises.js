const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//READ
//http://localhost:5000/exercises/
router.route("/").get((req, res) => {
  //We call Exercise.find() to get a list of all the
  //exercises from the DB.
  Exercise.find()
    //The find method returns a promise.
    //The results are returned in JSON format with res.json(exercises).
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

//CREATE
router.route("/").post((req, res) => {
  //assign username, description, duration & date are inputed
  //in Form data to vars
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  //After getting the username, description, duration & date,
  //we create a new instance of Exercise.
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  //Finally, the new exercise is saved to the DB with
  //the save() method and we return Exercise added!”
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//FIND by ID
//http://localhost:5000/exercises/[id]
//The /:id GET endpoint returns an exercise item
//given an id
//ID is created automatically by MongoDB
router.route("/:id").get((req, res) => {
  //We call Exercise.findById() with given ID req.params.id
  //to get one particular exercise from the DB.
  Exercise.findById(req.params.id)
    //The find method returns a promise.
    //The result is returned in JSON format with res.json(exercise).
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE
//http://localhost:5000/exercises/[id]
//The /:id DELETE endpoint deletes an exercise item given an id.
router.route("/:id").delete((req, res) => {
  //We call Exercise.findByIdAndDelete() with given ID
  //req.params.id
  //to get one particular exercise from the DB & delete it.
  Exercise.findByIdAndDelete(req.params.id)
    //The find method returns a promise.
    //The result is returned in JSON format .
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE
//http://localhost:5000/exercises/[id]
//The /:id PUT endpoint updates an existing exercise item.
router.route("/:id").put((req, res) => {
  //first retrieve the old exercise item from the DB
  //based on the id
  Exercise.findById(req.params.id)
    //set the exercise property values to
    //what’s available in the request body
    //(to what the user has updated in Form)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      //call exercise.save to save the updated object
      //in the DB
      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
