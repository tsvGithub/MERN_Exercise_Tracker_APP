const express = require("express");
const app = express();
//cors allows ajax requests to skip cross-origin policy
//& access recources from remote hosts
//access to smth outside our server from our server
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("dotenv").config();

app.use(cors());
//allow to parse json as server'll send&recieve json
app.use(express.json());
app.use(bodyParser.json());

//------------------------
//Routes
//we have to require the files (importing)
//to load the routers from other files.
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
//Then the routers are added as middleware
//& use these imported files.
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
//The server URL is https://localhost:5000
//if you add “/exercises” or “/users” on the end it'll
//load the endpoints defined in the corresponding router files.

//--------------------------
//MongoDB Atlas
// console.log(ATLAS_URI);
// const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/exercisetracker";
const uri = "mongodb+srv://only4Me:only4MeDB@cluster0-ztzuu.mongodb.net/exercisetracker?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
//once the connection is open it's going to log text:
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
//---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
