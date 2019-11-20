/**
 * @author: Isaias :D
 * Este archivo contiene las rutas / funciones  que procesara
 * el servdor
 */

 const express = require('express');
 const router = express.Router();
 const path = require("path");

 const modelo = require("../models/modeloDB");

 //Para subir archivos utilizamos multer

 const multer = require("multer");

 var storage = multer.diskStorage({
    destination: "../public/uploads",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });

 var upload = multer({
    storage: storage,
    
}).single('file');

//Login

router.post('/doLogin', function( req, res) {
    modelo.login( req.body )
    .then( (resultado) => {
        res.send( resultado )
    }).catch( err => {
        res.send({status: "error"});
        console.log( err )
    })

})


 //Registro de usuarios

 router.post( '/registrarUsuarios', function ( req, res){
     modelo.registrarUsuario( req.body )
     .then( (resultado) => {
         res.send( 'Ok' )
     })
     .catch( err => {
         res.send( 'Nop' )
         console.log( err )
     })
 })

 //Obtener todas las recetas
 router.get( '/consultarRecetasDB/', function ( req, res ) {
    modelo
    .consultarTodasLasRecetas( )
    .then( (recetas ) => {
        res.send( recetas );
    } )
    .catch( err => {
        console.log( err );
    });
 });


 //Obtener una receta a partir del nombre
 router.get( '/consultarReceta/:nom' , function (req,res) {
    modelo
    .consultarReceta(req.params.nom)
    .then( ( receta ) => {
        res.send(  receta );
    }).catch( err => {
        console.log( err );
    })
 });

 //Obtener una receta a partir de un ingrediente
 router.get( '/consultarRecetaPorIngrediente/:ingrediente', function (req,res ) {
    modelo
    .consultarIngrediente( req.params.ingrediente)
    .then( (recetas) => {
        res.send( recetas );
    })
    .catch( err => {
        console.log( err );
    })
 });

 //Obtener receta por id
 router.get( '/consultarRecetaPorId/:id', function ( req, res ) {
     modelo.consultarPorId( req.params.id )
     .then( (receta) => {
          res.send( receta )
     }).catch( err => {
         console.log( err )
     })
 })

 //Obtener recetas a partir de varios ingredientes separados
 //por &&
 router.get( '/consultarRecetaPorIngredientes/:ingredientes', function (req, res ){
    var ingrs = ( req.params.ingredientes.split("&&") );
    var cad  = "";
    for( let i=0; i<ingrs.length; i++){
        if( i == 0 ){
            cad = `${ingrs[0]}`
        }else{
            cad += `|${ingrs[i]}`;
        }
    }

    modelo
        .consultarIngredientes( cad )
        .then( (recetas) => {
            console.log( recetas )
            res.send( recetas );
        })
        .catch( err => {
            console.log( err );
        })

 });

 router.post("/upload", function(req, res){
     upload( req, res, function(err){
         if( err instanceof multer.MulterError ){
             return res.status(500).json(err)
         }else if( err ){
             return res.status(500).json(err)
         }
         console.log( req.file )
         return res.status(200).send(req.file)
     })
 } );

 router.get( '/consultarRecetaPorImagen/:url', function ( req, res ){
     var cad = "https://www.recetasdesbieta.com/wp-content/uploads/2019/02/";
    modelo.conultarPorImagen( cad + req.params.url + ".jpg" );
 } );

 module.exports = router;