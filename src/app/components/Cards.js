import React, {Component} from 'react';

import  '../Styles/MyTheme.css';

import axios from 'axios';

class Cards extends Component{
    
    constructor( props ){
        super( props );
        this.state = {
            arrRecetas: []
        }

        this.verReceta = this.verReceta.bind(this);
    }

    verReceta(e, id){
        
    }

    componentDidMount(){
        axios.get('http://localhost:3000/ipn/api/consultarRecetasDB/')
        .then( res => {
            let recetas = res.data.rows;
            this.setState({ arrRecetas: recetas });
        })
    }
    
    render() {
        return( 

            <div>
                <div className="container">
                    <div className="row">
            {
                this.state.arrRecetas.map( (receta) => {
                    return(
                        
                        <div className="col s4" key={receta.id}>
                        
                            <div className="card" >
                                <div className="card-image">
                                    <img  src={receta.link_imagen} />
                                    <span className="card-title" id="tituloRecetas">  {receta.nombre}  </span>
                                </div>

                                <div className="card-content">
                                    <p className="formatoTexto"><br/> {receta.intro}...<br></br> </p>
                                </div>
                                <div className="card-action">
                                    <a onClick={(e) => this.verReceta(e, receta.id)}> Ver Receta</a>
                                </div>
                            </div>
                         
                         </div>
                        
                    )
                })
            }
            </div>
            </div>
            </div>

         
               
          
             
        )
    }
}

export default Cards;