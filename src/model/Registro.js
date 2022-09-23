const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Registra = new Schema({
    nombrecompleto: String,
    matricula: Number,
    carrera: String,
    semestre: Number,
    fecha: Date
});
module.exports = mongoose.model('Registro', Registra);