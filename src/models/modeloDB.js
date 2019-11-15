const conexion  = require("../conexion");

module.exports = {


    async consultarTodasLasRecetas( ){
        let resultado = await conexion.query(" select id,nombre, substring(intro, 0, 180) as intro, link_imagen from recetas LIMIT 21");
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
    },

    async registrarUsuario( usuario ){
        var nombre = usuario.nombre;
        var apellido = usuario.apellido;
        var nickname = usuario.nickname;
        var password = usuario.password;
        var sexo = usuario.sexo;
        var fecha = usuario.fecha;
        var peso = usuario.peso;
        var estatura = usuario.estatura;

        fecha = new Date();
        var today = new Date();

        var age = today.getFullYear() - fecha.getFullYear();
        var m = today.getMonth() - fecha.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < fecha.getDate())) {
            age--;
        }

        var consulta = `Insert into usuarios values (DEFAULT,'${nombre}','${nickname}','${password}','${sexo}',${age},${peso},${estatura});`;

        let resultado = await conexion.query(consulta);
        return resultado;

    }

    
}