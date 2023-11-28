require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// port from .env
const port = process.env.PORT;

// middleware
// 1. parses request data and attaches it to req.body
app.use(express.json());

// 2. prints request method and path on console
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// workout routes api
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening for requests
    app.listen(port, (req, res) => {
      console.log(`Connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
