import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Inicio from './Inicio';
import Registro from './Registro';
import VistaRecetas from './VistaRecetas';

function App(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={ Inicio } />
            <Route exact path="/Registro" component={ Registro } />
            <Route exact path='/Receta/:id' component={ VistaRecetas } />
        </BrowserRouter>

    )
}

export default App;