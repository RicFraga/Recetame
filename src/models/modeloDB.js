const conexion  = require("../conexion");

module.exports = {


    async consultarTodasLasRecetas( ){
        let resultado = await conexion.query(" select id,nombre, substring(intro, 0, 200) as intro, link_imagen from recetas ");
        return resultado;
    },

    async consultarReceta( nombre ){
        let resultados = await conexion.query(`select * from recetas where nombre='${nombre}'`);
        return resultados.rows[0];
    },

    async consultarIngrediente( ingrediente ){
        let resultados = await conexion.query( `select id,nombre from recetas where ingredientes ilike '%${ingrediente}%'` );
        return resultados.rows;
    },

    async consultarIngredientes( ingredientes ){
        let resultados = await conexion.query( `select id, nombre from recetas where ` + ingredientes );
        return resultados.rows;
    },

    async conultarPorImagen( url ){
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');
    
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
    
        // Performs label detection on the image file
        const [result] = await client.labelDetection(url);
        const labels = result.labelAnnotations;
        console.log('Labels:' + labels.description );
        //labels.forEach(label => console.log("> " + label.description));
    }
}