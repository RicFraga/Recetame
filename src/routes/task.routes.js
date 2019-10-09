/**
 * @author: Isaias :D
 * Este archivo contiene las rutas / funciones  que procesara
 * el servdor
 */

 const express = require('express');
 const router = express.Router();

 const modelo = require("../models/modeloDB");

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

 //Obtener recetas a partir de varios ingredientes separados
 //por &&
 router.get( '/consultarRecetaPorIngredientes/:ingredientes', function (req, res ){
    var ingrs = ( req.params.ingredientes.split("&&") );
    var cad  = "";
    for( let i=0; i<ingrs.length; i++){
        if( i == 0 ){
            cad = `Ingredientes ilike '%${ingrs[0]}%'`
        }else{
            cad += ` OR ingredientes ilike '%${ingrs[i]}%'`;
        }
    }
    modelo
        .consultarIngredientes( cad )
        .then( (recetas) => {
            res.send( recetas );
        })
        .catch( err => {
            console.log( err );
        })

 });

 router.get( '/consultarRecetaPorImagen/:url', function ( req, res ){
     var cad = "https://www.recetasdesbieta.com/wp-content/uploads/2019/02/";
    modelo.conultarPorImagen( cad + req.params.url + ".jpg" );
 } );

 module.exports = router;