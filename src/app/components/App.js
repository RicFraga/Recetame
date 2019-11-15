import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Inicio from './Inicio';
import Registro from './Registro';

function App(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={ Inicio } />
            <Route exact path="/Registro" component={ Registro } />
            
        </BrowserRouter>

    )
}

export default App;