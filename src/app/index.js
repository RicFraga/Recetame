import React, { Component } from 'react';
import { render } from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';


import App from './components/App';

render( <App/>, document.getElementById('app'));
//render( <div> <BarraNavegacion/> <Parallax /> <Search/> <br/> <Cards/>  </div>, document.getElementById('app'));