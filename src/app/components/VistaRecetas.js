import React, { Component } from 'react';
import axios from 'axios';

import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';

import NavBar from './NavBarDos';
import '../Styles/MyTheme.css';
import CurrentLocation from './Maps';
export class VistaRecetas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            receta: {},
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    componentDidMount() {
        var id = this.props.match.params.id;

        axios.get('http://localhost:3000/ipn/api/consultarRecetaPorId/' + id)
            .then(res => {
                this.setState({ receta: res.data[0] })
            })

    }

    render() {


        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <div className="card large">
                                <div className="card-image">
                                    <img src={this.state.receta.link_imagen} />
                                    <span className="card-title"><h4> {this.state.receta.nombre} </h4></span>
                                </div>
                                <div className="card-content">
                                    <p id="textoRecetas">  {this.state.receta.intro}  </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 ">
                            <div className="card  teal lighten-5">
                                <div className="card-content ">
                                    <span className="card-title"> Ingredientes </span>
                                    <p>{this.state.receta.ingredientes}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 ">
                            <div className="card  teal lighten-5">
                                <div className="card-content ">
                                    <span className="card-title"> Preparación </span>
                                    <p>{this.state.receta.pasos}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 ">
                            <div className="card">
                                <div className="card-content large">
                                    <span className="card-title"> ¿Te hacen falta ingredientes ? </span>
                                    <p>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 ">
                            <CurrentLocation
                                centerAroundCurrentLocation
                                google={this.props.google}
                            >
                                <Marker onClick={this.onMarkerClick} name={'current location'} />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                    </div>
                                </InfoWindow>
                            </CurrentLocation>
                        </div>
                    </div >
                </div>
            </div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD3qx1A5HpKAffq6Yx95OIB9t6nlL_Blcc'
})(VistaRecetas);