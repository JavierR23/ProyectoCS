const express = require('express');
const router = express.Router();
const model = require('../model/registro')();

const Registra = require('../model/registro');

router.get('/', async (req, res) => {
    const valores = await Registra.find();
    console.log(valores);
    res.render('index.ejs', {
        valores
    });
});

router.get('/ver', async (req, res) =>{
    const valores = await Registra.find();
    console.log(valores);
    res.status(200).json({reg: valores});
});

router.post('/add', async (req, res) => {
    const valor = new Registra(req.body);
    await valor.save();
    res.redirect('/');
});

router.get('/del/:id', async(req, res) =>{
    const {id} = req.params;
    await Registra.findByIdAndRemove(id);
    res.redirect('/');
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
    /*const {id} = req.params;
    await Registra.findById(id);
    console.log(Registra);
    res.redirect('/');*/
});

router.post('/up/:id', async(req, res) =>{
    const {id} = req.params;
    await Registra.findByIdAndUpdate(id, req.body);
    res.redirect('/');
    
});

module.exports = router;