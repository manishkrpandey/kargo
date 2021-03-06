const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/register', registerRoutes);
app.use('/account',loginRoutes);

mongoose
  .connect(
    'mongodb+srv://manish1:manish@cluster0-gpev2.mongodb.net/registration?retryWrites=true', { useNewUrlParser: true }
  )
  .then(result => {
    // console.log('result',result.connections[0].collections);
    app.listen(port);
  })
  .catch(err => console.log(err));


