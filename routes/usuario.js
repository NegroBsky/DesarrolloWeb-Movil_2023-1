const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuthenticated = require('../helpers/jwtAuthenticated');
const User = require('../models/user');

router.post('/crear', (req, res) => {
    User.create(req.body);
    res.json({
        success: true,
    });
});

router.post('/ingresar' , async (req, res) => {
    const currentUser = await User.findOne({
        correo: req.body.correo,
        contrasenha: req.body.contrasenha,
    });
    if(!currentUser || currentUser.contrasenha !== req.body.contrasenha){
        res.json({
            success: false,
            message: 'Usuario o contraseña incorrectos',
        });
        return;
    }
    const payload = currentUser["_doc"];
    delete payload.contrasenha;
    const signedJWT = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({
        success: true,
        jwt: signedJWT,
    });
});
    
module.exports = router;