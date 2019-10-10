/**
 * @author: Isaias :D
 * Es este archivo se crea / configura el servidor 
 * y el funcionamiento
 */

const express = require('express');

//Morgan se encarga de mostrar las peticiones realizadas al servidor
const morgan = require('morgan');
//PATH se encarga de convertir una ruta virtual en una ruta  del archivos del S.O.
const path = require('path');


const app = express();



/* Ajustes del servidor */

app.set('port', process.env.PORT || 3000 ); //Especificamos el puerto del server

/* Middlewares */

app.use( morgan('dev') );
//Usaremos el formato de respuesta de tipo JSON para comunicarnos con el front
app.use( express.json() ); 

/* Rutas */
app.use( '/ipn/api', require('./routes/task.routes'));

/* Archivos estaticos */

//Especificamos donde estarna nuestros archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));;

app.get('/*', (req, res) =>{
    res.sendFile( path.join(__dirname, 'public/index.html'));
})

console.log( path.join(__dirname, 'public' ));
app.listen( app.get('port') , () => {
    //Mensaje que indica que el servidor se esta ejcutando
    console.log(`Server on port ${app.get('port')}`);
});