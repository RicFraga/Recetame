import React, { Component } from "react";
import M from "materialize-css";
import axios from 'axios';

import '../Styles/materialize.min.css';
import '../Styles/Inicio.css'

class Modal extends Component {

    constructor( props ){
        super( props );

        this.state = {
            Usuario: "",
            Password: ""
        }

        this.onHandleEvent = this.onHandleEvent.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

   onHandleEvent(e){

    var elem = e.target.id;
    var elemVal = e.target.value;

    if( elem === 'Email'){
        this.setState({Usuario: elemVal})
    }else if( elem === 'Password'){
        this.setState({Password: elemVal})
    }

   }

   doLogin(){
       //Hacer consulta post
       axios.post( 'http://localhost:3000/ipn/api/doLogin', {
            Usuario : this.state.Usuario,
            Password : this.state.Password
       }).then( (res) =>{
           console.log( res )
       }).catch( (err) => {
           console.log( err )
       })

   }

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <div className="colorTexto">
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          Iniciar
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
      <h4>Iniciar sesión</h4>
	 <div className="col s6">
      <div className="row">
		 <div className="input-field col s12">
          <input id="Email" type="text" className="validate" onChange={this.onHandleEvent} />
          <label htmlFor="Email">Nombre de usuario</label>
        </div>
        <div className="input-field col s12">
          <input id="Password" type="text" className="validate" onChange={this.onHandleEvent} />
          <label htmlFor="Password">Contraseña</label>
        </div>
		 <div className="input-field col s12">
          <button type="submit" className="waves-effect waves-light btn" onClick={this.doLogin}>Iniciar sesión</button>
        </div>
	           
      </div>	
     </div>
     
    </div>
    <div className="modal-footer">
      <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
        </div>
      </div>
    );
  }
}

export default Modal;