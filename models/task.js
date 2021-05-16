const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Task Schema
const TaskSchema = mongoose.Schema ({
    task_userId: {
      type: String
    },
    task_type: {
      type: String
    },
    task_name: {
      type: String
    },
    task_info: {
      type: String
    },
    task_duedate: {
      type: String
    },
    task_time: {
      type: String
    },
    task_isDone: {
      type: Boolean
    },
    task_label: {
      type: String
    }
  });
  
  const Task = module.exports = mongoose.model('Task', TaskSchema);

  module.exports.getTaskById = function(id, callback) {
    Task.findById(id, callback);
  }
  
  module.exports.getTaskByName = function(task_name, callback) {
    const query = {task_name: task_name}
    Task.findOne(query, callback);
  }
  
  module.exports.addTask = function(newTask, callback) {
    console.log("adding task", newTask)
    newTask.save();
  }
  
  module.exports.deleteTask = function(task_id, callback){
    console.log("deleting task")
    const query = {task_id: task_id}
    Task.deleteOne(query, callback);
  }