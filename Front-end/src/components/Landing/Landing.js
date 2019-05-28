import React, { Component } from 'react'
import './Landing.css'
import Navbar from '../NavBar/Navbar';
import { Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import URLStorage from '../../constants';

export default class Landing extends Component {
  render(){
      //let name = localStorage.getItem("ptoname");
    return(
      <div>
         < Navbar />
        <div className="titleLanding">
           <h4 className="welcomeTxt">Welcome</h4>
          <h1>THREAT MONITOR</h1>
          <Link className="startsBtn" to="/modeselection"><Button><p className="startTxt">Start</p></Button></Link>
        </div>
      </div>
      )
  }
}
