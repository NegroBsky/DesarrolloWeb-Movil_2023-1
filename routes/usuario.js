const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuthenticated = require('../helpers/jwtAuthenticated');
const getAuthenticatedUser = require('../helpers/getCurrentUser');
const User = require('../models/user');

router.post('/crear', async (req, res) => {
    const existingUser = await User.findOne({ correo: req.body.correo });
    if (existingUser) {
        res.json({
            success: false,
            message: 'El usuario ya existe',
        });
        return;
    }
    User.create(req.body);
    res.json({
        success: true,
    });
});

require('dotenv').config(); // Load the .env file

router.post('/ingresar', async (req, res) => {
    const currentUser = await User.findOne({
        correo: req.body.correo,
    });
    if (!currentUser || currentUser.contrasenha !== req.body.contrasenha) {
        res.json({
            success: false,
            message: 'Usuario o contraseña incorrectos',
        });
        return;
    }
    const payload = currentUser["_doc"];
    delete payload.contrasenha;
    const signedJWT = jwt.sign(payload, process.env.JWT_PASSWORD, {
        expiresIn: '1h',
    });

    res.json({
        success: true,
        jwt: signedJWT,
    });
});

router.get('/corriente', jwtAuthenticated, async (req, res) => {
    const currentUser = await getAuthenticatedUser(req);
    res.json({
        success: true,
        user: currentUser,
    });
});

module.exports = router;