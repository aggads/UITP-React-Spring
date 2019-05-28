import React, { Component } from 'react'
import './Reports.css'
import { Link } from "react-router-dom";
import Navbar from '../NavBar/Navbar';
/*import './Landing.css'
*/

export default class Reports extends Component {
  render(){
    return(
      <React.Fragment>
         <Navbar />
        <div className="report">
       
          <div className="title">
            <h1>Thank you</h1>
            <button className="reportBtn downloadBtn" type="submit"><Link className="nav-link" to="/pdf">Download</Link></button>
          </div>
        </div>
      </React.Fragment>
      )
  }
}
