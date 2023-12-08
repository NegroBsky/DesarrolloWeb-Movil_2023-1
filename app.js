const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
  .then((result) => console.log('Connected to Database'))
  .catch((err) => console.log(err));

module.exports = app;