import React, { Component } from 'react';
import axios from 'axios';



class VistaRecetas extends Component{

    constructor( props ){
        super( props );

        this.state = {
            receta: {}
        };
    }

    componentDidMount(){
        var id =  this.props.match.params.id ;

        axios.get( 'http://localhost:3000/ipn/api/consultarRecetaPorId/' + id )
        .then( res => {
            this.setState({receta : res.data[0] })
        })

    }

    render(){

        console.log( this.state.receta )
        
        return ( 
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col s12"> <h5> { this.state.receta.nombre } </h5></div>
                        <div className="col s6"> <img src={this.state.receta.link_imagen } width="300" height="225" /> </div>
                        <div className="col s6 ">  {this.state.receta.intro }  </div>

                        <div className="col s12"> {this.state.receta.ingredientes } </div>
                        <div className="col s12"> {this.state.receta.pasos } </div>
                        <div className="col s12"> <h5> Información  </h5></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default VistaRecetas;