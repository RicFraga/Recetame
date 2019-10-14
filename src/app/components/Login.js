import React, { Component } from "react";
import M from "materialize-css";
import $ from "jquery";

class Login extends Component {
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
        <div className="col s12">
          <div className="card ">
            <div className="card-content">
              <h4> Registro: </h4>

              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">Nombre</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Apellido</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input id="Nickname" type="text" className="validate" />
                  <label htmlFor="Nickname">Nickname</label>
                </div>

                <div className="input-field col s12">
                  <input id="Password" type="password" className="validate" />
                  <label htmlFor="Password">Password</label>
                </div>

                <div className="input-field col s6">
                  <select>
                    <option value="">Elige una opcion:</option>
                    <option value="1"> Mujer </option>
                    <option value="2"> Hombre </option>
                  </select>
                  <label>Sexo</label>
                </div>

                <div className="input-field col s6">
                  <input type="text" className="datepicker" id="fecha"></input>
                  <label htmlFor="fecha"> Fecha de nacimiento </label>
                </div>

                <div className="input-field col s6">
                  <input id="Peso" type="text" className="validate" />
                  <label htmlFor="Peso">Peso</label>
                </div>

                <div className="input-field col s6">
                  <input id="Estatura" type="text" className="validate" />
                  <label htmlFor="Estatura">Estatura</label>
                </div>

              </div>
            </div>
            <div className="card-action">
                <div className="row">
                    <div className="col s6" >
                        <center>
                            <a className="waves-effect waves-light btn-small">Button</a>
                        </center>
                    </div>
                        <center>
                            <a className="waves-effect waves-light btn-small">Button</a>
                        </center>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
