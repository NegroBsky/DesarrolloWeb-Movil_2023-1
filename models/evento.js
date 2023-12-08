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
        default: 0
    },
    nombreCandidatoDos: {
        type: String,
        required: true
    },
    votosCandidatoDos: {
        type: Number,
        default: 0
    },
    nombreCandidatoTres: {
        type: String,
        required: true
    },
    votosCandidatoTres: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        default: 'Abierto'
    }

});
const Evento = module.exports = mongoose.model('Evento', eventSchema);