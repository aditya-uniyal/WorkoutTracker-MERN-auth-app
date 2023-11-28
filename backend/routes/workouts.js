const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// import workout controllers
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// middleware to check authenticated requests (require auth for all workout routes)
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
