import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import  '../Styles/MyTheme.css';




class Cards extends Component{
    
    constructor( props ){
        super( props );

        this.state = {
            arrRecetas: [],
            titulo: "",
            idReceta: null,
            redirec: false
        }

        this.verReceta = this.verReceta.bind(this);
    }

    verReceta(e, id){
        //nuevo componente con el id como prop para hacer la busqueda
        this.setState({redirec : true , idReceta : id})
    }
       
    render() {

        if( this.state.redirec ){
            return <Redirect to={`/Receta/${this.state.idReceta}`} />
        }
        
        

        return( 

            <div>
                <div className="container">
                    <div className="row">
            {
                this.props.recetasList.map( (receta) => {
                    return(
                        
                        <div className="col s6" key={receta.id}>
                        
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