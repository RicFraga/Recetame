import React from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Inicio from './Inicio';
import Login from './Login';

function App(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={ Inicio } />
            <Route exact path="/login" component={ Login } />
            
        </BrowserRouter>

    )
}

export default App;