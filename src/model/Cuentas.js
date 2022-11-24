const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cuentas = new Schema({
    correo: String,
    contrasena: String
});
module.exports = mongoose.model('cuentas', Cuentas);