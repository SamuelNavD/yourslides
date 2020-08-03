'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const uploadsRoutes = require('./routes/uploads');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // En el * deberíamos poner las url permitidas para acceder a la api
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/user', userRoutes);
app.use('/content', uploadsRoutes);

module.exports = app;