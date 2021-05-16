const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Task = require('../models/task')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {

    let newUser = new User ({
      name: req.body.name,
      phone: req.body.phone,
      username: req.body.username,
      preg_week: req.body.preg_week,
      password: req.body.password
    });
  
    User.addUser(newUser, (err, user) => {
      if(err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {
        res.json({success: true, msg: 'User registered'});
      }
    });
  });
  

// authenticate
router.post('/authenticate', (req, res, next) => {
    // res.send("authenticate!")
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, msg: 'User not found'});
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              phone: user.phone,
              preg_week: user.preg_week
            }
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//get tasks on dashboard
router.get('/mood', function(req, res, next){
  Task.find(function(err, tasks){
      if (err){
          res.send(err);
      }
      res.json(tasks);
  })
});

//get tasks on weight tracker
router.get('/note', (req, res, next)=>{
  Task.find(function(err, tasks){
    if (err){
        res.send(err);
    }
    res.json(tasks);
})
})


//add task
router.post('/mood', (req, res, next) => {
  // let newTask = new Task ({
  //   task_name: req.body.task_name,
  //   task_info: req.body.task_info
  // });

  // Task.addTask(newTask, (err, task) => {
  //   if(err) {
  //     res.json({success: false, msg: 'Failed to add task'});
  //   } else {
  //     res.json({success: true, msg: 'Task added'});
  //   }
  // });
  var task = req.body;
  console.log("dashboard", task)
  if(!task.task_name || !(task.task_info + '')){
      res.status(400);
      res.json({
          "error": "Bad Data"
      });}
      else{
  const { task_info, task_name, task_userId, task_type, task_duedate, task_time, task_label, task_isDone } = req.body;
  let task = {};
  task.task_name= task_name;
  task.task_info= task_info;
  task.task_userId=task_userId;
  task.task_type = task_type;
  task.task_duedate= task_duedate;
  task.task_label =task_label;
  task.task_time = task_time;
  task.task_isDone= task_isDone;
  
  let taskModel = new Task(task);
  taskModel.save();
  res.json(taskModel);}
});

//update task
router.put('/mood/:taskId', (req, res, next) => {
  var task = req.body;
  var updTask = {};

  if(task.task_name){
    updTask.task_name = task.task_name;
  }

  if(task.task_info){
    updTask.task_info = task.task_info;
  }
  if(!updTask){
    res.status(400);
    res.json({
        "error":"Bad Data"
    });}
    else{
      const id = req.params.taskId;
      Task.update({ _id: id }, updTask, {}, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
        })
   }
})

//delete by id
router.delete('/mood/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    console.log("why doenst")
    Task.deleteOne({ _id: id }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    //   .exec()
    //   .then(result => {
    //     res.status(200).json(result);
    //   })
    //   .catch(err => res.status(500).json({ error: err }));
  });
    

//add task to weight tracker
router.post('/note', (req, res, next) => {
  var task = req.body;
  console.log("nw", task)
  if(!task.task_name || !(task.task_info + '')){
      res.status(400);
      res.json({
          "error": "Bad Data"
      });}
      else{
        const { task_info, task_name, task_userId, task_type, task_duedate, task_time, task_label, task_isDone } = req.body;
        let task = {};
        task.task_name= task_name;
        task.task_info= task_info;
        task.task_userId=task_userId;
        task.task_type = task_type;
        task.task_duedate= task_duedate;
        task.task_label =task_label;
        task.task_time = task_time;
        task.task_isDone= task_isDone;
  
  let taskModel = new Task(task);
  taskModel.save();
  res.json(taskModel);}
});

//update task to weight tracker
router.put('/note/:taskId', (req, res, next) => {
  var task = req.body;
  console.log(task.task_isDone, "isdone")
  var updTask = {};

  if(task.task_name){
    updTask.task_name = task.task_name;
  }

  if(task.task_info){
    updTask.task_info = task.task_info;
  }

  if (task.task_duedate){
    updTask.task_duedate = task.task_duedate;
  }
  if (task.task_time){
    updTask.task_time = task.task_time;
  }
  if (task.task_label){
    updTask.task_label = task.task_label;
  }
  if (task.task_isDone){
    
    updTask.task_isDone = task.task_isDone;
    console.log(updTask.task_isDone)
  }
  if (!task.task_isDone){
    
    updTask.task_isDone = task.task_isDone;
    console.log(updTask.task_isDone)
  }

  
  if(!updTask){
    res.status(400);
    res.json({
        "error":"Bad Data"
    });}
    else{
      const id = req.params.taskId;
      Task.update({ _id: id }, updTask, {}, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
        })
   }
})

//delete by id
router.delete('/note/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    console.log("deleting in routes -> user.js")
    Task.deleteOne({ _id: id }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
  });
    
//get tasks in appointments
router.get('/appointment', (req, res, next)=>{
  Task.find(function(err, tasks){
    if (err){
        res.send(err);
    }
    res.json(tasks);
})
})

//add task in appointments
router.post('/appointment', (req, res, next) => {
  var task = req.body;
  console.log("nw", task)
  if(!task.task_name || !(task.task_info + '')){
      res.status(400);
      res.json({
          "error": "Bad Data"
      });}
      else{
        const { task_info, task_name, task_userId, task_type, task_duedate, task_time, task_label, task_isDone } = req.body;
        let task = {};
        task.task_name= task_name;
        task.task_info= task_info;
        task.task_userId=task_userId;
        task.task_type = task_type;
        task.task_duedate= task_duedate;
        task.task_label =task_label;
        task.task_time = task_time;
        task.task_isDone= task_isDone;
  
  let taskModel = new Task(task);
  taskModel.save();
  res.json(taskModel);}
});


//delete task in appointments
router.delete('/appointment/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  console.log("deleting in routes -> user.js")
  Task.deleteOne({ _id: id }, function(err, task){
      if(err){
          res.send(err);
      }
      res.json(task);
  });
});
  

//update task in appointments
router.put('/appointment/:taskId', (req, res, next) => {
  var task = req.body;
  console.log(task.task_isDone, "isdone")
  var updTask = {};

  if(task.task_name){
    updTask.task_name = task.task_name;
  }

  if(task.task_info){
    updTask.task_info = task.task_info;
  }

  if (task.task_duedate){
    updTask.task_duedate = task.task_duedate;
  }
  if (task.task_time){
    updTask.task_time = task.task_time;
  }
  if (task.task_label){
    updTask.task_label = task.task_label;
  }
  if (task.task_isDone){
    
    updTask.task_isDone = task.task_isDone;
    console.log(updTask.task_isDone)
  }
  if (!task.task_isDone){
    
    updTask.task_isDone = task.task_isDone;
    console.log(updTask.task_isDone)
  }

  
  if(!updTask){
    res.status(400);
    res.json({
        "error":"Bad Data"
    });}
    else{
      const id = req.params.taskId;
      Task.update({ _id: id }, updTask, {}, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
        })
   }
})

module.exports = router;