import React, { Component } from 'react';
import { render } from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';

//Impor barra navegacion
import BarraNavegacion from './components/NavBar';
import Parallax from './components/Parallax';
import Search from './components/Search';
import Cards from './components/Cards';

render( <div> <BarraNavegacion/> <Parallax /> <Search/> <br/> <Cards/>  </div>, document.getElementById('app'));