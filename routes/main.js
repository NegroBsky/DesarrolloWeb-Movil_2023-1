const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuthenticated = require('../helpers/jwtAuthenticated');
const getAuthenticatedUser = require('../helpers/getCurrentUser');
const evento = require('../models/evento');


router.get('/eventos', jwtAuthenticated ,async (req, res) => {
    const currentUser = await getAuthenticatedUser(req);
    const eventos = await evento.find({});
    res.json({
        allEvents : eventos.map((current) => {
            return {
                id: current._id,
                nombre: current.titulo,
                estado: current.estado,
            };
        })
    });     
});
router.get('/eventos/:_id', async (req, res) => {
    try {
        const Evento = require('../models/evento');

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
                candidato2: evento.nombreCandidatoDos,
                votos2: evento.votosCandidatoDos,
                candidato3: evento.nombreCandidatoTres,
                votos3: evento.votosCandidatoTres,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.post('/eventos/:_id/votar', async (req, res) => {
    const candidato = req.params.id;
    let success = false;

    if (candidato === '1' || candidato === '2' || candidato === '3') {
        try {
            const evento = await Evento.findById(req.params._id);
            if (!evento) {
                return res.status(404).json({ message: 'Event not found' });
            }

            if (candidato === '1') {
                evento.votosCandidatoUno += 1;
            } else if (candidato === '2') {
                evento.votosCandidatoDos += 1;
            } else if (candidato === '3') {
                evento.votosCandidatoTres += 1;
            }

            await evento.save();
            success = true;
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
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

router.post(' ' , (req, res) => {
   
    res.json({
        success: true,
        message: 'Estado actualizado',
    });
});

module.exports = router;