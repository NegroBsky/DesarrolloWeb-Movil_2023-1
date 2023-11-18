const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    nombreCandidatoUno: {
        type: String,
        required: true
    },
    votosCandidatoUno: {
        type: Number,
    },
    nombreCandidatoDos: {
        type: String,
        required: true
    },
    votosCandidatoDos: {
        type: Number,
    },
    nombreCandidatoTres: {
        type: String,
        required: true
    },
    votosCandidatoTres: {
        type: Number,
    }
});
const Evento = module.exports = mongoose.model('Evento', eventSchema);