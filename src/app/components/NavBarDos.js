import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import  '../Styles/MyTheme.css';
import '../Styles/Inicio.css';

import logo from '../images/logoEstesiDos.png'

class NavBar extends Component{

   constructor( props ){
     super( props );
     this.state  = {
       mostarRegistro: false,
       mostarInicio: false
     }
   }

  render(){
    return(
      <div >
        <nav id="color">
            <div className="nav-wrapper">
             <a className="brand-logo"><img src={logo} className="logo"></img>Receta fácil</a>
              <a  data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                
              </ul>
            </div>
          </nav>
      </div>
    )
  }
}

export default NavBar;