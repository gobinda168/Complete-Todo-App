const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const auth = require("../middlewares/auth");

//Private GET Get all task of a specific user
router.route("/").get(auth, getTasks);
//Private GET Get all task of a specific user
router.route("/").post(auth, addTask);
//Private GET Get all task of a specific user
router.route("/:_id").put(auth, updateTask);
//Private GET Get all task of a specific user
router.route("/:_id").delete(auth, deleteTask);

module.exports = router;
