const express = require('express');
const log = require('morgan');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index.js');

//Escucha al Servidor
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Conexion a la BD
mongoose.connect('mongodb+srv://Javier:lXNBZuFxoyAII0kT@cluster0.6lme8b3.mongodb.net/Escuela?retryWrites=true&w=majority')
.then(bd => console.log('BD se conecto')).catch(err => console.log(err));

//Middleware
app.use(log('dev'));
app.use(bodyparser.urlencoded({extended: false}));

//Rutas
app.use('/', indexRoutes); 

app.listen(app.get('port'), () =>(
    console.log('Servidor Funcionando En El Puerto', app.get('port'))
));