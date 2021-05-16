const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users.js');
const app = express();
const config = require('./config/database')

//connecting to database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database '+config.database);
  });

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });

const port = 3000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
  });