import React, { Component } from 'react';
import bground from '../images/bg_1.jpg';
import searchIcon from '../images/search icon.png'

import M from 'materialize-css';
import '../Styles/MyTheme.css';
import ReactDOM from 'react-dom'

import Cards from './Cards';
import Search from './Search';
import ReactTags from 'react-tag-autocomplete'

import '../Styles/styleSearch.css';

class Parallax extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [
            ]
        }

        this.onAddition = this.onAddition.bind(this);
    }

    componentDidMount() {
        M.Parallax.init(this.Parallax1);
    }

    onAddition(tag) {
        console.log("Intento de agregar")
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    

    onDelete(i) {
        console.log("Eliminando")
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    render() {
        return (
            <div>


                <div className="parallax-container" id="tamParallax">
                    <div ref={Parallax => this.Parallax1 = Parallax} className="parallax"> <img src={bground} /> </div>

                </div>
                <div className="section white">

                    
                    <div id="divBarra">
                        <ReactTags
                            tags={this.state.tags}
                            onDelete={this.onDelete.bind(this)}
                            onAddition={this.onAddition.bind(this)} 
                            placeholderText="Ingrese un ingrediente"
                            allowNew={true}
                            removeButtonText="Click para eliminar ingrediente"
                            
                        />
                    </div>

                    <h2 className="formatoTexto"> Top recetas</h2>
                    <Cards></Cards>

                </div>
            </div>
        )
    }

}

export default Parallax;