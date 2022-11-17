const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Registra = new Schema({
    matricula: Number,
    nombrecompleto: String,
    carrera: String,
    semestre: Number,
    fecha: Date
});
module.exports = mongoose.model('registro', Registra);