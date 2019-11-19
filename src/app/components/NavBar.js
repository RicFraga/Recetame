import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import  '../Styles/MyTheme.css';
import LoginModal from './LoginModal';


class NavBar extends Component{
  render(){
    return(
      <div >
        <nav id="color">
            <div className="nav-wrapper">
             <a href="#!" className="brand-logo"><i className="material-icons">local_dining</i>Recetas</a>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li></li>
                <li>< Link to={"/Registro"} >Registro</Link></li>
              </ul>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li><a href="sass.html">Login</a></li>
            <li><a href="badges.html">Signup</a></li>
          </ul>

          <LoginModal />
      </div>
    )
  }
}

export default NavBar;