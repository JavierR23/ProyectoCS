const express = require('express');
const router = express.Router();
const model = require('../model/registro')();
const model2 = require('../model/cuentas')();

const Registra = require('../model/registro');
const Cuentas = require('../model/cuentas');

router.get('/', async (req, res) => {
    const valores = await Cuentas.find();
    console.log(valores);
    res.render('login.ejs', {
        valores
    });
});

router.get('/index', async (req, res) => {
        const valores = await Registra.find();
        console.log(valores);
        res.render('index.ejs', {
            valores
        });
    });

router.post('/validar', async(req, res) =>{
    const{username, password} = req.body;

    Cuentas.findOne({username}, (err, user) =>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR');
                }else if(result){
                    res.redirect('/index');
                }else{
                    res.status(500).send('USUARIO O CONTRASEÑA INCORRECTA');
                    console.log(user);
                }
            });
        }
    });
});

router.get('/signup', async (req, res) => {
    const valores = await Cuentas.find();
    console.log(valores);
    res.render('crearcuenta.ejs', {
        valores
    });
});

router.post('/add2', async (req, res) => {
    const valor = new Cuentas(req.body);
    await valor.save();
    res.redirect('/');
});

router.get('/ver', async (req, res) =>{
    const valores = await Registra.find();
    console.log(valores);
    res.status(200).json({reg: valores});
});

router.post('/add', async (req, res) => {
    const valor = new Registra(req.body);
    await valor.save();
    res.redirect('/index');
});

router.get('/del/:id', async(req, res) =>{
    const {id} = req.params;
    await Registra.findByIdAndRemove(id);
    res.redirect('/index');
});

router.get('/mostrar/:id', async(req, res) =>{
    try{
        const informacion = await  Valor.findById(req.params.id).lean();
        const datos = await Valor.find();
        console.log(informacion);
        res.render('index.ejs', {informacion, datos});
    } catch (error){
        console.log(error.message);
    }
});

router.post('/up/:id', async(req, res) =>{
    const {id} = req.params;
    await Registra.findByIdAndUpdate(id, req.body);
    res.redirect('/index');
    
});

module.exports = router;