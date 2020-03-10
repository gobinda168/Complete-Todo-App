const { taskValidation } = require("../validations/taskValidation");
const Task = require("../models/TaskModel");

module.exports = {
  //Get Own tasks
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.sub });
      res.json({ tasks });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  },

  //add new task
  addTask: async (req, res) => {
    const { error } = taskValidation(req.body);
    if (error) return res.status(401).json({ msg: error.details[0].message });
    const { taskName } = req.body;
    try {
      const newTask = new Task({
        taskName,
        user: req.user.sub
      });
      await newTask.save();
      res.json({ newTask });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  },

  //update a task
  updateTask: async (req, res) => {
    const { error } = taskValidation(req.body);
    if (error) return res.status(401).json({ msg: error.details[0].message });
    try {
      const task = { ...req.body };
      let updatedTask = await Task.findById({ _id: req.params._id });
      console.log(updatedTask);
      if (!updatedTask) return res.status(500).json({ msg: "Task not Found" });

      if (req.user.sub != updatedTask.user.toString())
        return res.status(401).json({ msg: "Unathorized" });

      updatedTask = await Task.findByIdAndUpdate(
        req.params._id,
        {
          $set: task
        },
        { new: true }
      );
      res.json(updatedTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  },
  //Delete a task
  deleteTask: async (req, res) => {
    try {
      const task = await Task.find({ _id: req.params._id });
      if (!task) return res.status(401).json({ msg: "Task doesn't exist" });
      await Task.findByIdAndDelete({ _id: req.params._id });
      res.send("delete Tasks");
    } catch (error) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
};
