import React, { Component } from 'react';
import bground from '../images/bg_1.jpg';
import M from 'materialize-css';
import MyTheme from '../Styles/MyTheme.css';

class Parallax extends Component{

    componentDidMount(){
        M.Parallax.init(this.Parallax1);
    }

    render() {
        return(
            <div>
                <div className="parallax-container" id="tamParallax">
                    <div ref={ Parallax => this.Parallax1 = Parallax } className="parallax"> <img src={bground} /> </div>
                </div>
            </div>

            
        )
    } 

}

export default Parallax;