const express = require('express');
const router = express.Router();
const Evento = require('../models/evento');

router.get('/eventos' , (req, res) => {
    res.send('eventos');
});