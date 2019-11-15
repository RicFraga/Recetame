import React, { Component } from "react";
import M from "materialize-css";
import axios from 'axios';
import Noty from 'noty';

import "../Styles/registro.css";
import "../Styles/themes/bootstrap-v4.scss";
import "../Styles/noty.css";


import NavBar from './NavBar';
//insert into usuario values (1,'isaias','isaias','pacheco01','hombre',22,'')

class Registro extends Component {

  constructor( props ){
    super( props );

    this.state = {
      nombre : "admin",
      apellido: "admin",
      nickname: "admin",
      password: "admin",
      sexo: "hombre",
      fecha: "03/03/1997",
      peso: "1.67",
      estatura: "1.98"
    }

    this.onHandleChange = this.onHandleChange.bind(this);
    this.registrarUsuario = this.registrarUsuario.bind(this);
    this.onChangeFechaSexo = this.onChangeFechaSexo.bind(this);
  }

  registrarUsuario(){


      //Comprobar que los datos sean correctos
      axios.post( 'http://localhost:3000/ipn/api/registrarUsuarios/', {
          nombre : this.state.nombre,
          apellido : this.state.apellido,
          nickname : this.state.nickname,
          password : this.state.password,
          sexo : this.state.sexo,
          fecha : this.state.fecha,
          peso : this.state.peso,
          estatura : this.state.estatura
      }).then( response => {
        if( response.data === 'Ok'){

        }

        if( response.data === 'Nop'){
          new Noty({
              layout: "topCenter",
              theme: "bootstrap-v4",
              text: "El nombre de usuario ya esta registrado...",
              type: "error",
              timeout: 2000
          }).show();
        }

      }).catch( e => {
        console.log(e);
      })
  }

  onChangeFechaSexo(valor, e ){
    console.log( valor  + " - " + e.taget.id)
  }

  onHandleChange( e ){
     var elemento = e.target;
     var id = elemento.id;
     var val = elemento.value;

     console.log( val )

    if( id === 'fist_name'){
        this.setState({nombre: val});
    }

    if( id === 'last__name'){
        this.setState({apellido: val})
    }
     
    if( id === 'Nickname'){
      this.setState({nickname: val});
    }

    if( id === 'Password' ){
      this.setState({password: val});
    }


    if( id === 'Peso'){
      this.setState({peso: val});
    }


    if( id === 'Estatura' ){
      this.setState({estatura: val});
    }

  }

  componentDidMount() {
    let datepicker = document.querySelector(".datepicker");
    M.Datepicker.init(datepicker, {
      format: "dd/mm/yyyy",
      yearRange: [1950, 2019]
    });

    let elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  }

  render() {
    return (
      <div className="row">
        <NavBar/>
        <div className="col s12">
          <div className="card " id="cardRegistro">
          <form onSubmit={ this.registrarUsuario }> 
            <div className="card-content">
              <h4> Registro: </h4>
              
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate" onChange={this.onHandleChange}/>
                  <label htmlFor="first_name">Nombre</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" onChange={this.onHandleChange}/>
                  <label htmlFor="last_name">Apellido</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input id="Nickname" type="text" className="validate" onChange={this.onHandleChange} />
                  <label htmlFor="Nickname">Nickname</label>
                </div>

                <div className="input-field col s6">
                  <input id="Password" type="password" className="validate" 
                  onChange={ this.onHandleChange} />
                  <label htmlFor="Password">Password</label>
                </div>

                <div className="input-field col s6">
                  <select>
                    <option id="Sexo" value="" onChange={this.onHandleChange} >Elige una opcion:</option>
                    <option value="1"> Mujer </option>
                    <option value="2"> Hombre </option>
                  </select>
                  <label>Sexo</label>
                </div>

                <div className="input-field col s6">
                  <input id="Fecha" type="text" className="datepicker" id="fecha" 
                  onChange={ (value,e) => this.onChangeFechaSexo(value,e)}
                  selected={this.state.fecha} ></input>
                  <label htmlFor="fecha"> Fecha de nacimiento </label>
                </div>

                <div className="input-field col s6">
                  <input id="Peso" type="text" className="validate" onChange={this.onHandleChange}/>
                  <label htmlFor="Peso">Peso</label>
                </div>

                <div className="input-field col s6">
                  <input id="Estatura" type="text" className="validate" onChange={this.onHandleChange}/>
                  <label htmlFor="Estatura">Estatura</label>
                </div>

              </div>
              
            </div>
           
            <div className="card-action">
                <div className="row">
                    <div className="col s12" >
                        <center>
                            <button id="btnRegistro" type="button"
                            className="waves-effect waves-light btn-small"
                            onClick={this.registrarUsuario}
                            > ACEPTAR </button>
                        </center>
                    </div>
                        
                </div>
              
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registro;
