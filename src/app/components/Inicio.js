import React, {Component} from 'react';

//Impor barra navegacion
import Parallax from './Parallax';

import BarraNavegacion from './NavBar';


class Inicio extends Component{


render(){
    return(
        <div>
            <BarraNavegacion/>
            <Parallax/>
            
        </div>
    )
    }
}

export default Inicio;