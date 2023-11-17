const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURI = 'mongodb+srv://benjaminzuniga2:bzp121246@api.da5j7w5.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => console.log('Connected to Database'))
  .catch((err) => console.log(err));

module.exports = app;