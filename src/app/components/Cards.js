import React, {Component} from 'react';
import header from '../images/header.jpg';

import MyTheme from '../Styles/MyTheme.css';

import axios from 'axios';

class Cards extends Component{
    
    constructor( props ){
        super( props );
        this.state = {
            arrRecetas: []
        }
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
                    <h1> Top recetas </h1>
                    <div className="row">
            {
                this.state.arrRecetas.map( (receta) => {
                    return(
                        
                        <div className="col s4">
                        
                            <div className="card">
                                <div className="card-image">
                                    <img src={receta.link_imagen} />
                                    <span className="card-title">{receta.nombre}</span>
                                </div>

                                <div className="card-content">
                                    <p className="formatoTexto"><br/> {receta.intro}...<br></br> </p>
                                </div>
                                <div className="card-action">
                                    <a href="#"> this is a link</a>
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