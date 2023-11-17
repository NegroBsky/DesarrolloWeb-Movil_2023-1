const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    candidato1: {
        type: String,
        required: true
    },
    candidato2: {
        type: String,
        required: true
    },
    candidato3: {
        type: String,
        required: true
    },
    candidato4: {
        type: String,
        required: true
    }
});
const Evento = module.exports = mongoose.model('Evento', eventSchema);