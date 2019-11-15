import React, {Component} from 'react';
import '../Styles/MyTheme.css';

class Search extends Component{
    render(){
        return(
            <div>
            <nav className="barraBusqueda">
                <div className="nav-wrapper" id="color">
                <form>
                    <div className="input-field">
                    <input id="search" type="search" required />
                    <label className="label-icon"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                    </div>
                </form>
                </div>
            </nav>
            </div>
        )
    }
}

export default Search;