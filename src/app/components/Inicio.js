import React, {Component} from 'react';

//Impor barra navegacion
import Parallax from './Parallax';

import NavBar from './NavBar';

import '../Styles/Inicio.css'



class Inicio extends Component{


render(){
    return(
        <div className="divInicio">
            <NavBar mostrarInicio={true}/>
            <Parallax/>
        </div>
    )
    }
}

export default Inicio;