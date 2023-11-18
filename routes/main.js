const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuthenticated = require('../helpers/jwtAuthenticated');
const getAuthenticatedUser = require('../helpers/getCurrentUser');
const evento = require('../models/evento');


router.get('/eventos', async (req, res) => {
    const eventos = await evento.find({});
    res.json({
        allEvents : eventos.map((current) => {
            return {
                id: current._id,
                nombre: current.titulo,
            };
        })
    });     
});
router.get('/eventos/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({
            id: evento._id,
            nombre: evento.titulo,
            candidato1: evento.nombreCandidatoUno,
            votos1: evento.votosCandidatoUno,
            candidato2: evento.npmbreCandidatoDos,
            votos2: evento.votosCandidatoDos,
            candidato3: evento.nombreCandidatoTres,
            votos3: evento.votoCandidatoTres,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/eventos/:id/votar', (req, res) => {
    const candidato = req.params.id;
    let success = false;

    if (candidato === '1' || candidato === '2' || candidato === '3') {
        success = true;
    }

    res.json({
        success: success,
    });
});

router.post('/eventos/crear' , jwtAuthenticated , async(req, res) => {
    const currentUser = await getAuthenticatedUser(req);
    evento.create(req.body);
    res.json({
        success: true,
    });
});

router.post('/eventos/actualizarEstado' , (req, res) => {
   
    res.json({
        success: true,
        message: 'Estado actualizado',
    });
});
module.exports = router;