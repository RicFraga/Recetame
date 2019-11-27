import React, { Component } from 'react';
import bground from '../images/bg_1.jpg';
import searchIcon from '../images/search icon.png'

import M from 'materialize-css';
import '../Styles/MyTheme.css';

import Cards from './Cards';
import Search from './Search';
import ReactTags from 'react-tag-autocomplete'

import axios from 'axios';

import '../Styles/styleSearch.css';



 class Parallax extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recetas: [],
            file: null,
            titulo: "",
            auxRecetas: [],
            busquedas: [],
            tags: [
            ]
        }

        this.onAddition = this.onAddition.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange( e ){
        this.setState({file: e.target.files[0]})
        //console.log( e.target.files[0] )
    }

    onFormSubmit( e ){

        const formData = new FormData();
        formData.append('file', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:3000/ipn/api/upload", formData,{

        } )
        .then( (res) => {
            alert( res.statusText )
        }).catch( (err) => {
            alert(err)
        })

    }

    componentDidMount() {
        M.Parallax.init(this.Parallax1);

        
            axios.get('http://localhost:3000/ipn/api/consultarRecetasDB/')
            .then( res => {
                let arrRecetas = res.data.rows;
                this.setState({ recetas: arrRecetas, auxRecetas: arrRecetas, titulo : "Top Recetas" });
            })
    
        
    }

    onAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })

        //Recuperar cadena para poder realizar la busqueda por ingredientes
        
        var cad = "";
        for( var i=0; i<=this.state.tags.length; i++){
            
            if( i!= this.state.tags.length ){
                cad+=tags[i].name + "&&";
            }else{
                cad+=tags[i].name;
            }
            
        }

 
        axios.get( 'http://localhost:3000/ipn/api/consultarRecetaPorIngredientes/'+cad )
        .then( (res) => {
            let recetasRes = res.data;
            this.setState({recetas : recetasRes , titulo: "Resultados"})
            this.state.busquedas.push( recetasRes );
           

        }).catch( (err) => {
            console.log(err)
        })
    }

    

    onDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })

        //Se elimina un elemento del arreglo de busquedas
        this.state.busquedas.splice(i,1);
        var arrRecetasOld = this.state.busquedas[ this.state.busquedas.length - 1];

        if( tags.length === 0 ){
            this.setState({recetas: this.state.auxRecetas, titulo:"Top Recetas"})
        }else{
            this.setState({recetas: arrRecetasOld})
        }
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

                    <div> 
                        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
                            <input type="file" name="myFile" />
                            <input type="submit" value="enviar" />
                        </form>
                    </div>
       
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h2 className="formatoTexto"> {this.state.titulo} </h2>
                                <Cards recetasList={this.state.recetas} titulo={this.state.titulo}/>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
        )
    }

}

export default Parallax;