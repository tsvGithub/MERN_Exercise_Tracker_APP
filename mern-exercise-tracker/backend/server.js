const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//------------------------
//Routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

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
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
//---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
