const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env.ATLAS_URI);

app.use(cors());
//parse json as server sends&recieves json
app.use(express.json());

//------------------------
//Routes
// require files to load routers from other files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
// use routers
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
//The server URL is https://localhost:5000
//if you add “/exercises” or “/users” on the end it'll
//load the endpoints defined in the corresponding router files.

//--------------------------
//MongoDB Atlas
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/exercisetracker";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
//once the connection is open it's going to log text:
connection.once("open", function () {
  console.log("MongoDB Atlas connected successfully");
});
//---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
