import React from 'react';

//Impor barra navegacion
import BarraNavegacion from './NavBar';
import Parallax from './Parallax';
import Search from './Search';
import Cards from './Cards';

function Inicio(){
    return(
        <div>
            <BarraNavegacion></BarraNavegacion>
            <Parallax></Parallax>
            <Search>
            </Search>
            <Cards></Cards>
        </div>
    )
}

export default Inicio;